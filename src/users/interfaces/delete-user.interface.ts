import { User } from '../user.entity';

export interface DeleteUserResponse {
  deleted: boolean;
  user: User;
}
