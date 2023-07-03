import { UserInfo } from '../../user/entity/user-info.entity';

export interface JwtPayload {
  username: string;
  userInfo: UserInfo;
}