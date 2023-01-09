import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Received from './components/Received/Received';
import Header from './components/Header/Header';
import { useAppSelector } from './hooks/hooks';
import { Product } from './types/types';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import { RootState } from './stores';

import s from './App.module.scss';

const App: React.FC = () => {
   const [isOrder, setIsOrder] = useState<boolean>(false); // Состояние окна об успешном заказе
   const data: Product[] = useAppSelector((state: RootState) => state.mainReducer.mainSlice.data);

   // Высчитываем сумму выбранных товаров
   const sumComputed: number = useAppSelector((state: RootState) =>
      state.mainReducer.mainSlice.data.reduce(
         (sum: number, item: Product) => (item.selected ? (sum += item.sum) : sum),
         0
      )
   );

   // Проверяем, есть ли выбранные товары
   const hasSelectedComputed: boolean = useAppSelector((state: RootState) => {
      const countSelectedComputed = state.mainReducer.mainSlice.data.reduce(
         (count: number, item: Product) => (item.selected ? (count += 1) : count),
         0
      );
      return countSelectedComputed > 0;
   });

   return (
      <>
         <Header />
         {isOrder && <Received setIsOrder={setIsOrder} />}
         {data ? (
            <main className={s.app}>
               <Routes>
                  <Route
                     path='/'
                     element={<Order hasSelectedComputed={hasSelectedComputed} sumComputed={sumComputed} data={data} />}
                  />
                  <Route
                     path='/cart'
                     element={
                        <Cart
                           hasSelectedComputed={hasSelectedComputed}
                           sumComputed={sumComputed}
                           setIsOrder={setIsOrder}
                           data={data}
                        />
                     }
                  />
               </Routes>
            </main>
         ) : (
            <h1>Произошла ошибка при получении данных</h1>
         )}
      </>
   );
};

export default App;
