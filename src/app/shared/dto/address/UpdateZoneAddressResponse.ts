import { BaseResponse } from "../BaseResponse";

export class ZoneAddressChange {
    id: number;
    street: string;
    number: string;
    oldIdZone: number;
    newIdZone: number;
}

export class UpdateZoneAddressResponse extends BaseResponse {
    dryRun: boolean;
    total: number;
    changed: ZoneAddressChange[];
    withoutZone: ZoneAddressChange[];

    constructor(data: any) {
        super(data);
        if (data) {
            this.dryRun = data.dryRun;
            this.total = data.total;
            this.changed = data.changed;
            this.withoutZone = data.withoutZone;
        }
    }
}
