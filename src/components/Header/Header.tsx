import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import { Product } from '../../types/types';
import { RootState } from '../../stores';

import iconApp from '../../assets/img/icon-app.png';
import cart from '../../assets/img/cart.png';

import s from './Header.module.scss';

// Шапка сайта
const Header: React.FC = () => {
   // Высчитываем количество выбранных товаров
   const countSelectedComputed: number = useAppSelector((state: RootState) =>
      state.mainReducer.mainSlice.data.reduce(
         (count: number, item: Product) => (item.selected ? (count += 1) : count),
         0
      )
   );
   return (
      <div className={s.header}>
         <div className={s.headerContainer}>
            <div className={s.headerContent}>
               <Link to='/'>
                  <div className={s.headerContent__Icon}>
                     <img src={iconApp} alt='' width='30px' height='30px' />
                  </div>
               </Link>
               <Link to='/'>
                  <div className={s.headerContent__Name}>Store app</div>
               </Link>
            </div>
            <Link className={s.headerInfo} to='/cart'>
               <div className={s.headerInfo__Cart}>
                  <div className={s.headerInfo__CartImage}>
                     <img src={cart} alt='' width='25px' height='25px' />
                  </div>
                  <div className={s.headerInfo__CartSeparation} />
                  <div className={s.headerInfo__CartCount}>
                     <div className={s.headerInfo__CartCount_Text}>Выбранные товары:</div>
                     <div className={s.headerInfo__CartCount_Number}>{countSelectedComputed}</div>
                  </div>
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Header;
