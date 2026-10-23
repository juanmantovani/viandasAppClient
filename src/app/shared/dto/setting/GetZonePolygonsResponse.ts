import { BaseResponse } from "../BaseResponse";
import { ZonePolygon } from 'src/app/shared/models/ZonePolygon';


export class GetZonePolygonsResponse extends BaseResponse {
    zones: ZonePolygon[]

    constructor(data: any) {
        super(data);
        if (data)
            this.zones = data.map((z: any) => new ZonePolygon(z));

    }
}
