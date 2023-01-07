import React, { ReactElement } from 'react';
import cn from 'classnames';

import GoodsCart from '../../components/Goods/GoodsCart';
import { Product, SetState } from '../../types/types';
import { clearCart } from '../../stores/mainSlice';
import { useAppDispatch } from '../../hooks/hooks';

import s from './Cart.module.scss';

interface CartProps {
   hasSelectedComputed: boolean;
   setIsOrder: SetState<boolean>;
   sumComputed: number;
   data: Product[];
}

// Экран Корзины
const Cart: React.FC<CartProps> = ({ hasSelectedComputed, sumComputed, setIsOrder, data }) => {
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
                  onClick={() => dispatch(clearCart())}
                  type='button'
               >
                  Очистить корзину
               </button>
               <div className={s.cartButtons__Result}>
                  <div className={s.cartButtons__ResultSum}>Сумма заказа: {sumComputed} ₽</div>
                  <button
                     className={cn(s.cartButton, s.cartButtons__Order)}
                     onClick={() => setIsOrder(true)}
                     type='button'
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
