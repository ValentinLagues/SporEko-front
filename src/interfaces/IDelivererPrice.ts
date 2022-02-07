export default interface IDelivererPrice {
  id_item: number;
  name: string;
  min_weight: number;
  max_weight: number;
  price: number;
  id_deliverer: number;
}
