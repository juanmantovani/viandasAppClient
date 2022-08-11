import { Banner } from "../../models/Banner";

export class DeleteBannerRequest{
    public banner: Banner;
  //public legajoUsuario: number;
  constructor(data: any) {
    if (data)
      this.banner = new Banner(data.banner)
  }
}