import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { RoleUserEnum } from '@enum/role-user.enum';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { CertificateStatusEnum, GenderEnum, TypeRegisterEnum } from '../enum';
import { Certificate, Experience, StatiticReview } from '../types';
import { GroupDetaiType } from '../types/group-detail.type';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, default: RoleUserEnum.customer })
  role: RoleUserEnum = RoleUserEnum.customer;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groups: string[];

  @Prop({
    type: [
      {
        idGroupDetail: { type: Types.ObjectId, ref: 'GroupDetail' },
        accessMethods: {
          type: [{ type: String, enum: MethodRouteEnum }],
          default: [MethodRouteEnum.GET],
        },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    default: [],
  })
  groupDetails: GroupDetaiType[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }] })
  groupAPIAccesses: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }] })
  groupAPIDenines: string[];

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String, default: '' })
  username: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({ type: String, default: TypeRegisterEnum.HAQUA })
  typeRegister: TypeRegisterEnum = TypeRegisterEnum.HAQUA;

  @Prop({ type: String, default: '', select: false })
  tokenLogin: string;

  @Prop({ type: String, default: '' })
  deviceID: string;

  @Prop({ type: [String], default: [] })
  fcmTokens: string[];

  @Prop({ type: Boolean, default: true })
  enableFCM: boolean;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: String, default: '' })
  fullName: string;

  @Prop({ type: Number, default: 0 })
  born: number;

  @Prop({ type: String, default: GenderEnum.FEMALE })
  gender: GenderEnum = GenderEnum.FEMALE;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  idProvince: string;

  @Prop({ type: String, default: '' })
  nation: string;

  @Prop({ type: String, default: '' })
  job: string;

  @Prop({
    type: [
      {
        fieldName: { type: String, required: true },
        year: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    default: [],
  })
  experiences: Experience[];

  @Prop({ type: [String], default: [] })
  capacity: string[];

  @Prop({ type: [String], default: [] })
  myAlbum: string[];

  @Prop({ type: Number, default: 0 })
  defaultAccount: number;

  @Prop({ type: String, default: '' })
  bankName: string;

  @Prop({ type: String, default: '' })
  branchName: string;

  @Prop({ type: String, default: '' })
  bankAccountNumber: string;

  @Prop({ type: String, default: '' })
  bankAccountName: string;

  @Prop({
    type: [
      {
        idCertificate: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Certificate',
          required: true,
        },
        status: {
          type: String,
          default: CertificateStatusEnum.NOT_PASSED,
        },
        numberTest: Number,
        createdAt: { type: Date, default: new Date() },
      },
    ],
    default: [],
  })
  certificates: Certificate[];

  @Prop({
    type: {
      totalReputation: { type: Number },
      countReputation: { type: Number },
      totalRating: { type: Number },
      countRating: { type: Number },
      numberStatisfied: { type: Number },
      numberNotStatisfied: { type: Number },
    },
    default: {
      totalReputation: 0,
      countReputation: 0,
      totalRating: 0,
      countRating: 0,
      numberStatisfied: 0,
      numberNotStatisfied: 0,
    },
  })
  statiticReview: StatiticReview;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: String, default: '' })
  readonly identity: string;

  @Prop({ type: Number, default: 0 })
  readonly dateOfCreatedId: number;

  @Prop({ type: String, default: '' })
  readonly addressOfCreatedId: string;

  @Prop({ type: { lat: { type: String, default: '' }, lng: { type: String, default: '' } }, default: {} })
  locations: { lat: string; lng: string };

  @Prop({
    type: {
      idQuestionAsker: { type: String },
      idRespondent: { type: String },
      idQuestion: { type: String },
      caller: { type: String },
      idRoom: { type: String },
      expiryTime: { type: Number },
    },
    default: {},
  })
  callStatus: {
    idQuestionAsker: string;
    idRespondent: string;
    idQuestion: string;
    caller: string;
    idRoom: string;
    expiryTime: number;
  };

  comparePassword: (candidatePassword: string) => boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

/* eslint func-names: 0 */
// Pre save
UserSchema.pre('save', async function (next: any) {
  const user = this as UserDocument;

  // if (user.isModified('email')) {
  //   user.username = user.email.split('@')[0].trim();
  // }

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  return next();
});
