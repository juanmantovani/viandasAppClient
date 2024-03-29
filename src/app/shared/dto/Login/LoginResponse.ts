import { Time } from "@angular/common";
import { BaseResponse } from "../BaseResponse";

export class LoginResponse extends BaseResponse{

    status: string;
    result: any;
    token: string;
    expiresIn: Time;

}