import { User } from "./user.interface";

export interface CheckTokenResponse {
  user:         User;
  access_token: string;
}
