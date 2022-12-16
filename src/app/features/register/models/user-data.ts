import { Observable } from 'rxjs';
import { Ecclesiastical } from './ecclesiastical';
import { Personal } from './personal';
import { Supplementary } from './supplementary';

export type CombinedUserData = Observable<
  [Personal | undefined, Supplementary | undefined, Ecclesiastical | undefined]
>;
