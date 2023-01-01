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
      <div className={cn(s.product, s.inProductsPanel)}>
         <div className={s.productName}>{product.name}</div>
         <img className={s.productImg} src={product.img} alt='' />
         <div className={s.productInfo}>
            <div>{product.price} Р</div>
         </div>
         <button
            onClick={() => dispatch(selectProduct(product))}
            disabled={product.selected}
            className={s.productButton}
            type='button'
         >
            +
         </button>
      </div>
   );
};

export default GoodsPanel;
