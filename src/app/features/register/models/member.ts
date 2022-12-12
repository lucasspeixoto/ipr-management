import { User } from '@authMd/user.model';
import { Ecclesiastical } from './ecclesiastical';
import { Personal } from './personal';
import { Process } from './process';
import { Supplementary } from './supplementary';

export type Member = {
  auth: User;
  personal: Personal;
  ecclesiastical: Ecclesiastical;
  supplementary: Supplementary;
  process: Process;
  observation: string;
};
