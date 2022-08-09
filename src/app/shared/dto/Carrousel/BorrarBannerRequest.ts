import { Banner } from "../../models/Banner";

export class BorrarBannerRequest{
    public banner: Banner;
  //public legajoUsuario: number;
  constructor(data: any) {
    if (data)
      this.banner = new Banner(data.banner)
  }
}