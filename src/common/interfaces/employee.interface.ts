import { STATUS } from "../enums/status.enum";

export interface Employee {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: STATUS;
}
