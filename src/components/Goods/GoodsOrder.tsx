import React from 'react';
import cn from 'classnames';

import { deleteProduct, minusAmount, plusAmount } from '../../stores/mainSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { Product } from '../../types/types';

import deleteImg from '../../assets/img/delete.png';

import s from './Goods.module.scss';

interface ProductProps {
   product: Product; // Элемент из массива data
}

// Товар
const GoodsOrder: React.FC<ProductProps> = ({ product }) => {
   const dispatch = useAppDispatch();
   return (
      <article className={cn(s.product, s.inOrder)}>
         <p className={s.productName}>{product.name}</p>
         <img className={s.productImg} src={product.img} alt='' />
         <div className={s.productInfo}>
            <p>{product.sum} Р</p>
            <p>{product.amount + ' шт.'}</p>
         </div>
         <div className={s.productEdit}>
            <div className={s.productEdit_InOrder}>
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

export default GoodsOrder;
