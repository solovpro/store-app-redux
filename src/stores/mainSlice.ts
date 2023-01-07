import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, InitialState } from '../types/types';
import { data } from '../data/data';
import { RootState } from './index';

const mainSlice = createSlice({
   name: 'toolkit',
   initialState: {
      data: data, // Данные о товарах
   } as InitialState,
   reducers: {
      // Очистить корзину
      clearCart(state: RootState) {
         state.data.forEach((dataEl: Product) => {
            dataEl.amount = 0;
            dataEl.selected = false;
            dataEl.sum = 0;
         });
      },

      // Добавить товар в заказ
      selectProduct(state: RootState, action: PayloadAction<Product>) {
         if (!action.payload.selected) {
            state.data.forEach((dataEl: Product): void => {
               if (dataEl.id === action.payload.id) {
                  dataEl.selected = true;
                  dataEl.amount = 1;
                  dataEl.sum = dataEl.price;
               }
            });
         }
      },

      // Удалить товар из заказа или корзины
      deleteProduct(state: RootState, action: PayloadAction<Product>) {
         state.data.forEach((dataEl: Product): void => {
            if (dataEl.id === action.payload.id) {
               dataEl.selected = false;
               dataEl.amount = 0;
            }
         });
      },

      // Уменьшить количество товара в заказе
      minusAmount(state: RootState, action: PayloadAction<Product>) {
         if (action.payload.amount !== 1) {
            state.data.forEach((dataEl: Product): void => {
               if (dataEl.id === action.payload.id) {
                  dataEl.amount -= 1;
                  dataEl.sum -= dataEl.price;
               }
            });
         } else {
            state.data.forEach((dataEl: Product): void => {
               if (dataEl.id === action.payload.id) {
                  dataEl.selected = false;
                  dataEl.amount = 0;
               }
            });
         }
      },

      // Увеличить количество товара в заказе
      plusAmount(state: RootState, action: PayloadAction<Product>) {
         state.data.forEach((dataEl: Product): void => {
            if (dataEl.id === action.payload.id) {
               dataEl.amount += 1;
               dataEl.sum += dataEl.price;
            }
         });
      },
   },
});

export default mainSlice.reducer;
export const { clearCart, selectProduct, deleteProduct, minusAmount, plusAmount } = mainSlice.actions;
