import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Received from './components/Received/Received';
import { useAppSelector } from './hooks/hooks';
import Header from './components/Header/Header';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import { RootState } from './stores';

import s from './App.module.scss';

const App: React.FC = () => {
   const data = useAppSelector((state: RootState) => state.mainReducer.mainSlice.data);
   const [isOrder, setIsOrder] = useState<boolean>(false); // Состояние окна об успешном заказе
   return (
      <main className={s.app}>
         <Header />
         {isOrder && <Received setIsOrder={setIsOrder} />}
         {data ? (
            <div className={s.appContent}>
               <Routes>
                  <Route path='/' element={<Order />} />
                  <Route path='/cart' element={<Cart setIsOrder={setIsOrder} />} />
               </Routes>
            </div>
         ) : (
            <div>Произошла ошибка при получении данных</div>
         )}
      </main>
   );
};

export default App;
