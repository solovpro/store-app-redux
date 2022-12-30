import React, { ReactElement } from 'react';
import cn from 'classnames';

import { clearCart } from '../../stores/mainSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import GoodsCart from '../../components/Goods/GoodsCart';
import { Product } from '../../types/types';
import { RootState } from '../../stores';

import s from './Cart.module.scss';

interface CartProps {
   setIsOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

// Экран Корзины
const Cart: React.FC<CartProps> = ({ setIsOrder }) => {
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

   const dispatch = useAppDispatch();
   return (
      <div className={s.cart}>
         <div className={s.cartHeader}>Корзина</div>
         <>
            {data.map((product: Product): ReactElement | undefined => {
               if (product.selected) {
                  return <GoodsCart product={product} key={product.id} />;
               }
            })}
            {!hasSelectedComputed && <div className={s.cartNotSelected}>Нет выбранных товаров</div>}
         </>
         {hasSelectedComputed && (
            <div className={s.cartButtons}>
               <button
                  className={cn(s.cartButton, s.cartButtons__Clear)}
                  type='button'
                  onClick={() => dispatch(clearCart())}
               >
                  Очистить корзину
               </button>
               <div className={s.cartButtons__Result}>
                  <div className={s.cartButtons__ResultSum}>Сумма заказа: {sumComputed} ₽</div>
                  <button
                     className={cn(s.cartButton, s.cartButtons__Order)}
                     type='button'
                     onClick={() => setIsOrder(true)}
                  >
                     Заказать
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Cart;
