export class ZonePolygon {
    idZone: number;
    paths: google.maps.LatLngLiteral[];

    constructor(data: any) {
        if (data) {
            this.idZone = data.idZone;
            this.paths = data.paths;
        }
    }
}
