/* eslint-disable */
import { Types } from 'mongoose';
import dayjs from 'dayjs';
import fs, { existsSync } from 'fs';

import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BaseService from '@base-inherit/base.service';
import {
  MongoTransferer,
  MongoDBDuplexConnector,
  LocalFileSystemDuplexConnector,
} from 'mongodb-snapshot';

import { getConnectionDb } from 'src/util/database/getConnectionDB';
import BackupDataRepository from './backup-data.repository';
import { BackupDataDocument } from './schemas/backup-data.schema';
import { backupDataConstants } from './backup-data.constants';

@Injectable()
export default class BackupDataService extends BaseService<BackupDataDocument> {
  folderStore = backupDataConstants.FOLDER_STORE;

  backupName = process.env.DATABASE_NAME;

  currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');

  backupFile = `${this.folderStore}/${this.currentTime}-${this.backupName}.gz`;

  constructor(
    readonly logger: CustomLoggerService,
    readonly backupDataRepository: BackupDataRepository,
  ) {
    super(logger, backupDataRepository);
  }

  /**
   * Backup file
   */
  public async backup() {
    return this.backupPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      })
      .then((message) => message);
  }

  /**
   * Restore backup data
   */
  public async restore(id: Types.ObjectId) {
    const backupDoc = await this.backupDataRepository.findOneById(id);

    if (!backupDoc) throw new NotFoundException('Backup file not found');

    return this.restorePromise(backupDoc.path)
      .catch((error) => {
        throw new BadRequestException(error);
      })
      .then((message) => message);
  }

  /**
   *
   */
  private initBackup(pathLocal: string, isBackup = true) {
    // Mongo connector
    const mongoConnector = new MongoDBDuplexConnector({
      connection: {
        uri: `${process.env.MONGODB_URL as string}`,
        dbname: `${process.env.DATABASE_NAME as string}`,
        isAtlasFreeTier: true,
      },
    });

    // Localfile connector
    const localFileConnector = new LocalFileSystemDuplexConnector({
      connection: {
        path: pathLocal,
      },
    });

    // Transferer
    if (isBackup) {
      return new MongoTransferer({
        source: mongoConnector,
        targets: [localFileConnector],
      });
    }

    // Restore
    return new MongoTransferer({
      source: localFileConnector,
      targets: [mongoConnector],
    });
  }

  /**
   * backup promise
   * @returns
   */
  private async backupPromise() {
    // update time
    this.currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    this.backupFile = `${this.folderStore}/${this.currentTime}-${this.backupName}.tar`;

    // init backup
    const transferer = this.initBackup(this.backupFile);

    // Processing
    // eslint-disable-next-line no-restricted-syntax
    for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
    }

    // remove old
    await this.removeOldBackupFiles(30);

    // store backup file
    await this.backupDataRepository.create({
      path: this.backupFile,
    });

    this.logger.log(
      'Backup SUCCESS',
      `Backup is successfull at ${this.currentTime}`,
    );

    return { status: true };
  }

  /**
   * Restore promise
   * @param path
   * @returns
   */
  private async restorePromise(pathLocal: string) {
    // check file exists
    if (existsSync(pathLocal)) {
      // update time
      this.currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      this.backupFile = `${this.folderStore}/${this.currentTime}-${this.backupName}.tar`;

      // Backup before restore
      await this.backupPromise();

      // Delete all database before backup
      const database = getConnectionDb();
      const collections = await database.listCollections();

      // update name database backupdatas to backupdatastemp
      await database.collection('backupdatas').rename('backupdatastemp');

      // eslint-disable-next-line no-restricted-syntax
      for await (const collection of collections) {
        if (collection.name !== 'backupdatastemp') {
          console.log(`Dropping ${collection.name}`);
          await database.collection(collection.name).drop();
        }
      }

      // init backup
      const transferer = this.initBackup(pathLocal, false);

      // Processing
      // eslint-disable-next-line no-restricted-syntax
      for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
      }

      // update name database backupdatas to backupdatastemp
      database.collection('backupdatas').drop();
      database.collection('backupdatastemp').rename('backupdatas');

      this.logger.log(
        'Restore SUCCESS',
        `Restore is successfull at ${this.currentTime}`,
      );

      return { status: true };
    }

    return { status: false, message: 'File not exists' };
  }

  /**
   * Remove old backup files
   * @param ignoreLatestFile
   */
  private async removeOldBackupFiles(ignoreLatestFile = 10) {
    // get all files in "folderStore" and sort
    const files = fs.readdirSync(this.folderStore).sort();

    // ignore the latest files
    files.splice(-ignoreLatestFile);

    // remove
    files.forEach(async (file) => {
      const path = `${this.folderStore}/${file}`;

      await this.backupDataRepository.deleteOneHardBy({ path });

      fs.unlinkSync(path);
    });
  }
}
