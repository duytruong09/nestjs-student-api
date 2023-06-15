import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';

import { ShareFunction } from '@helper/static-function';
import OtpModule from '@common/c2-otp/otp.module';

import FreeApiModule from '@authorization/a2-free-api/free-api.module';
import AuthUserAccessModule from '@authorization/a3-auth-user-access/auth-user-access.module';
import AuthUserIdModule from '@authorization/a4-auth-user-id/auth-user-id.module';
import GroupModule from '@authorization/a5-group/group.module';
import GroupApiModule from '@authorization/a7-group-api/group-api.module';
import GroupDetailModule from '@authorization/a6-group-detail/group-detail.module';

import RolesGuard from '@guard/roles.guard';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import HistoryModule from '@common/c9-history/history.module';

import DashboardModule from '@common/c10-dashboard/dashboard.module';
import SpecializeModule from '@features/f1-specialize/specialize.module';
import StudentModule from '@features/f2-baitap1/baitap1.module';
import KhoaModule from '@features/f2-khoa/khoa.module';
// import LopModule from '@features/f2-lop/lop.module';
import ProvinceModule from './common/c6-province/province.module';
import DistrictModule from './common/c7-district/district.module';
import VillageModule from './common/c8-village/village.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import UploadModule from './common/c3-upload/upload.module';
import AuthModule from './common/c1-auth/auth.module';
import UserModule from './authorization/a1-user/user.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      // Authorizations
      { path: '/users', module: UserModule },
      { path: '/free-apis', module: FreeApiModule },
      { path: '/auth-user-accesses', module: AuthUserAccessModule },
      { path: '/auth-user-ids', module: AuthUserIdModule },
      { path: '/groups', module: GroupModule },
      { path: '/group-details', module: GroupDetailModule },
      { path: '/group-apis', module: GroupApiModule },

      // Commons
      { path: '/backup-datas', module: BackupDataModule },
      { path: '/auth', module: AuthModule },
      { path: '/otps', module: OtpModule },
      { path: '/uploads', module: UploadModule },
      { path: '/file-manager', module: FileManagerModule },
      { path: '/provinces', module: ProvinceModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/histories', module: HistoryModule },
      { path: '/dashboards', module: DashboardModule },

      // Features
      { path: '/specializes', module: SpecializeModule },
      { path: '/students', module: StudentModule },
      { path: '/khoas', module: KhoaModule },
    ],
  },
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Replace serve static via router static with s3 storage ***');
  routes.push({ path: '/static', module: StaticS3Module });
}
const imports = [
  RouterModule.forRoutes(routes),

  // authorization
  UserModule,
  FreeApiModule,
  AuthUserAccessModule,
  AuthUserIdModule,
  GroupModule,
  GroupDetailModule,
  GroupApiModule,
  RolesGuard,

  // common
  BackupDataModule,
  AuthModule,
  OtpModule,
  UploadModule,
  FileManagerModule,
  ProvinceModule,
  DistrictModule,
  VillageModule,
  HistoryModule,
  DashboardModule,

  // features
  SpecializeModule,
  StudentModule,
  KhoaModule,
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Import module S3Storage dynamic ***');
  imports.push(StaticS3Module);
}

@Module({
  imports,
})
export default class V1Module {}
