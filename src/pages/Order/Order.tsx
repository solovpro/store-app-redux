import React, { ReactElement } from 'react';
import { Product } from '../../types/types';
import cn from 'classnames';

import GoodsPanel from '../../components/Goods/GoodsPanel';
import GoodsOrder from '../../components/Goods/GoodsOrder';

import s from './Order.module.scss';

interface OrderProps {
   hasSelectedComputed: boolean;
   sumComputed: number;
   data: Product[];
}

// Экран Заказа
const Order: React.FC<OrderProps> = ({ hasSelectedComputed, sumComputed, data }) => (
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
                     {/*  &#8381; - Знак Рубля ( ₽ )  */}
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

export default Order;
