export interface Product {
   id: number;
   img: string;
   name: string;
   price: number;
   selected: boolean;
   amount: number;
   sum: number;
}
//func: (dataEl: Product) => void;
export interface InitialState {
   isReceived: boolean;
   data: Product[];
}
