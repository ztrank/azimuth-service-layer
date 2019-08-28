import { Nextable } from './Nextable';
import { Requestable } from './Requestable';
import { Respondable } from './Respondable';
import { UserInfo } from './User.Info';

export interface HttpContext {
    Request: Requestable;
    Response: Respondable;
    Next: Nextable;
    CurrentUser: UserInfo;
}