import React from 'react';

export interface Product {
   id: number;
   img: string;
   name: string;
   price: number;
   selected: boolean;
   amount: number;
   sum: number;
}

export interface InitialState {
   isReceived: boolean;
   data: Product[];
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
