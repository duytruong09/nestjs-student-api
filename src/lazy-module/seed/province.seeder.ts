import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Seeder } from 'nestjs-seeder';
import { Province } from '@common/c6-province/schemas/province.schema';
import path from 'path';
import { District } from '@common/c7-district/schemas/district.schema';
import { Village } from '@common/c8-village/schemas/village.schema';
import { ShareFunction } from '@helper/static-function';

@Injectable()
export default class ProvinceSeeder implements Seeder {
  constructor(
    @InjectModel(Province.name) private readonly modelProvince: Model<Province>,
    @InjectModel(District.name) private readonly modelDistrict: Model<District>,
    @InjectModel(Village.name) private readonly modelVillage: Model<Village>,
  ) {}

  async seed(): Promise<any> {
    const jsonPath = path.join(__dirname, '../../util/helper/dvhcvn.json');
    /* eslint no-console: 0 */
    console.log('jsonPath', jsonPath);
    if (ShareFunction.isFileExist(jsonPath)) {
      const dataString = ShareFunction.readFileSync(jsonPath).toString();
      try {
        const { data } = JSON.parse(dataString);

        // Upsert all province
        const _promiseProvince = [];
        for (let i = 0; i < data.length; i += 1) {
          _promiseProvince.push(
            this.modelProvince.findOneAndUpdate(
              { slug: ShareFunction.toSlug(data[i].name) },
              {
                $set: {
                  name: data[i].name,
                  type: data[i].type,
                  slug: ShareFunction.toSlug(data[i].name),
                },
              },
              { upsert: true, new: true },
            ),
          );
        }
        const province = await Promise.all(_promiseProvince);
        /* eslint no-console: 0 */
        console.log('Seed province', province.length);
        for (let i = 0; i < data.length; i += 1) {
          data[i]._id = province[i]._id;
        }

        // Upsert all district
        const _promiseDistrict = [];
        for (let i = 0; i < data.length; i += 1) {
          for (let j = 0; j < data[i].level2s.length; j += 1) {
            _promiseDistrict.push(
              this.modelDistrict.findOneAndUpdate(
                {
                  slug: ShareFunction.toSlug(data[i].level2s[j].name),
                  idProvince: data[i]._id,
                },
                {
                  $set: {
                    idProvince: data[i]._id,
                    name: data[i].level2s[j].name,
                    type: data[i].level2s[j].type,
                    slug: ShareFunction.toSlug(data[i].level2s[j].name),
                  },
                },
                { upsert: true, new: true },
              ),
            );
          }
        }
        const district = await Promise.all(_promiseDistrict);
        /* eslint no-console: 0 */
        console.log('Seed district', district.length);
        for (let i = 0; i < data.length; i += 1) {
          for (let j = 0; j < data[i].level2s.length; j += 1) {
            for (let k = 0; k < district.length; k += 1) {
              if (
                data[i]._id.toString() === district[k].idProvince?.toString()
                && district[k].slug === ShareFunction.toSlug(data[i].level2s[j].name)
              ) {
                data[i].level2s[j].province = data[i]._id;
                data[i].level2s[j]._id = district[k]._id;
                break;
              }
            }
          }
        }

        // Upsert all village
        const _bulkVillage = [];
        for (let i = 0; i < data.length; i += 1) {
          for (let j = 0; j < data[i].level2s.length; j += 1) {
            for (let k = 0; k < data[i].level2s[j].level3s.length; k += 1) {
              _bulkVillage.push({
                province: data[i].level2s[j].province,
                district: data[i].level2s[j]._id,
                name: data[i].level2s[j].level3s[k].name,
                type: data[i].level2s[j].level3s[k].type,
                slug: ShareFunction.toSlug(data[i].level2s[j].level3s[k].name),
              });
            }
          }
        }

        const village = await this.modelVillage.bulkWrite(
          _bulkVillage.map((item) => ({
            updateOne: {
              filter: {
                idProvince: item.province,
                idDistrict: item.district,
                slug: item.slug,
              },
              update: { $set: item },
              upsert: true,
              new: true,
            },
          })),
        );
        /* eslint no-console: 0 */
        // console.log('Seed village', village.result.nUpserted);
      } catch (e) {
        /* eslint no-console: 0 */
        console.error(e);
      }
    } else {
      console.error(`${jsonPath} was not found, cannot seed province`);
    }
  }

  async drop(): Promise<any> {
    return this.modelProvince.deleteMany({});
  }
}
