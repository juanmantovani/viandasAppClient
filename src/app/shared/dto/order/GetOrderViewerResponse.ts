import { OrderViewer } from "../../models/OrderViewer";
import { BaseResponse } from "../BaseResponse";

export class GetOrderViewerResponse extends BaseResponse{
orderViewer : OrderViewer[];

constructor(data : any) {
    super(data);
    if(data?.orderViewer)
        this.orderViewer = data.orderViewer.map((o:OrderViewer) => new OrderViewer(o));

  }
}