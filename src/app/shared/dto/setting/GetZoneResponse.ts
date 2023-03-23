import { BaseResponse } from "../BaseResponse";
import { Zone } from 'src/app/shared/models/Zone';


export class GetZoneResponse extends BaseResponse {
    zones: Zone[]

    constructor(data: any) {
        super(data);
        if (data)
            this.zones = data.map((z: any) => new Zone(z));

    }
}