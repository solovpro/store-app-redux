import React from 'react';

import { deleteProduct, minusAmount, plusAmount } from '../../stores/mainSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { Product } from '../../types/types';

import deleteImg from '../../assets/img/delete.png';

import s from './Goods.module.scss';

interface ProductProps {
   product: Product; // Элемент из массива data
}

// Товар
const GoodsCart: React.FC<ProductProps> = ({ product }) => {
   const dispatch = useAppDispatch();
   return (
      <article className={s.inCart}>
         <img className={s.productImg} src={product.img} alt='' />
         <div className={s.productEdit}>
            <div className={s.productInfo}>
               <p>Название: {product.name}</p>
               <p>Цена: {product.price} Р</p>
               <p>Количество: {`${product.amount} шт.`}</p>
            </div>
            <div className={s.productEdit__InCart}>
               <button className={s.productEdit__Delete} onClick={() => dispatch(deleteProduct(product))}>
                  <img src={deleteImg} alt='' width='35px' />
               </button>
               <div className={s.productEdit__Count}>
                  <div className={s.productEdit__CountSign}>
                     <button
                        onClick={() => dispatch(minusAmount(product))}
                        className={s.productEdit__CountSign_Minus}
                        type='button'
                     >
                        -
                     </button>
                  </div>
                  <div className={s.productEdit__CountSign}>
                     <button
                        onClick={() => dispatch(plusAmount(product))}
                        className={s.productEdit__CountSign_Plus}
                        type='button'
                     >
                        +
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
};

export default GoodsCart;
