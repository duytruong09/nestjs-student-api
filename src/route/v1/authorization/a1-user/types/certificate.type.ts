import { CertificateStatusEnum } from '../enum';

export type Certificate = {
  idCertificate: string;
  numberTest: number;
  status: CertificateStatusEnum;
  createdAt: Date;
};
