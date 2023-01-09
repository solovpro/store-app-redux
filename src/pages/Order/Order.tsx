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
   <section className={s.order}>
      <article className={cn(s.orderProducts, s.orderBlock)}>
         <h1 className={s.orderBlock__Header}>Товары</h1>
         <ul className={s.orderGoods}>
            {data.map((product: Product): ReactElement | undefined => (
               <li>
                  <GoodsPanel product={product} key={product.id} />
               </li>
            ))}
         </ul>
      </article>
      <div className={s.orderSeparation} />
      <aside className={cn(s.orderSelected, s.orderBlock)}>
         <h1 className={s.orderBlock__Header}>Заказ</h1>
         <div className={s.orderGoods}>
            {hasSelectedComputed ? (
               <ul>
                  {data.map((product: Product): ReactElement | undefined => {
                     if (product.selected) {
                        return (
                           <li>
                              <GoodsOrder product={product} key={product.id} />
                           </li>
                        );
                     }
                  })}
                  {/*  &#8381; - Знак Рубля ( ₽ )  */}
                  <h2 className={s.orderGoods__Result}>Сумма заказа: {sumComputed} &#8381;</h2>
               </ul>
            ) : (
               <p className={s.orderGoods__NotSelected}>Нет выбранных товаров</p>
            )}
         </div>
      </aside>
   </section>
);

export default Order;
