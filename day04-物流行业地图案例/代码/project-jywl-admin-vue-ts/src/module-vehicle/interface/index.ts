export interface TableData {
  id?: string
  orderNumber?: string
  waybillNumber?: string
  orderTime?: string
  status?: string
  senderName?: string
  senderPhone?: string
  senderAddress?: string
  senderProvince: ReceiverCity
  senderCity: ReceiverCity
  senderCounty: ReceiverCity
  receiverProvince: ReceiverCity
  receiverCity: ReceiverCity
  receiverCounty: ReceiverCity
  receiverName?: string
  receiverPhone?: string
  receiverAdress?: string
  deliverytype?: string
  payType?: string
  paymentStatus?: string
}

export interface ReceiverCity {
  id?: string
  lat?: string
  lng?: string
}
