import React from 'react';
import cn from 'classnames';

import { selectProduct } from '../../stores/mainSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { Product } from '../../types/types';

import s from './Goods.module.scss';

interface ProductProps {
   product: Product; // Элемент из массива data
}

// Товар
const GoodsPanel: React.FC<ProductProps> = ({ product }) => {
   const dispatch = useAppDispatch();
   return (
      <article className={cn(s.product, s.inProductsPanel)}>
         <p className={s.productName}>{product.name}</p>
         <img className={s.productImg} src={product.img} alt='' />
         <div className={s.productInfo}>
            <p>{product.price} р</p>
         </div>
         <button
            onClick={() => dispatch(selectProduct(product))}
            disabled={product.selected}
            className={s.productButton}
            type='button'
         >
            {product.selected ? 'Добавлено' : 'Добавить в корзину'}
         </button>
      </article>
   );
};

export default GoodsPanel;
