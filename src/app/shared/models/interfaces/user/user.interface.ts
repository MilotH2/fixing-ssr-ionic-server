import { UserRolesEnum } from './enums/user_roles.enum';
import { UserStatusesEnum } from './enums/user_statuses.enum';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: UserRolesEnum;
  status: UserStatusesEnum;
}
