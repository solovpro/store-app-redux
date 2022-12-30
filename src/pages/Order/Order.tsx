import React, { ReactElement } from 'react';
import { Product } from '../../types/types';
import cn from 'classnames';

import GoodsPanel from '../../components/Goods/GoodsPanel';
import GoodsOrder from '../../components/Goods/GoodsOrder';
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../stores';

import s from './Order.module.scss';

// Экран Заказа
const Order: React.FC = () => {
   const data = useAppSelector((state: RootState) => state.mainReducer.mainSlice.data);

   // Высчитываем сумму выбранных товаров
   const sumComputed = useAppSelector((state: RootState) =>
      state.mainReducer.mainSlice.data.reduce(
         (sum: number, item: Product) => (item.selected ? (sum += item.sum) : sum),
         0
      )
   );

   // Проверяем, есть ли выбранные товары
   const hasSelectedComputed = useAppSelector((state: RootState) => {
      const countSelectedComputed = state.mainReducer.mainSlice.data.reduce(
         (count: number, item: Product) => (item.selected ? (count += 1) : count),
         0
      );
      return countSelectedComputed > 0;
   });
   return (
      <div className={s.order}>
         <div className={cn(s.orderProducts, s.orderBlock)}>
            <div className={s.orderBlock__Header}>Товары</div>
            <div className={s.orderGoods}>
               {data.map((product: Product): ReactElement | undefined => (
                  <GoodsPanel product={product} key={product.id} />
               ))}
            </div>
         </div>
         <div className={s.orderSeparation} />
         <div className={cn(s.orderSelected, s.orderBlock)}>
            <div className={s.orderBlock__Header}>Заказ</div>
            <div className={s.orderGoods}>
               {hasSelectedComputed ? (
                  <>
                     {data.map((product: Product): ReactElement | undefined => {
                        if (product.selected) {
                           return <GoodsOrder product={product} key={product.id} />;
                        }
                     })}
                     <div className={s.orderGoods__Result}>
                        <div className={s.cartResult}>Сумма заказа: {sumComputed} &#8381;</div>
                     </div>
                  </>
               ) : (
                  <div className={s.orderGoods__NotSelected}>Нет выбранных товаров</div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Order;
