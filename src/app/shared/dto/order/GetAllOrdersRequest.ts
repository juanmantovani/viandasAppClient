export class GetAllOrdersRequest {
    dateStart: Date | null;
    dateEnd: Date | null;
    paid: boolean;
    notPaid: boolean;
    active: boolean;
    inactive: boolean;
}