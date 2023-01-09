import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hooks';
import { clearCart } from '../../stores/mainSlice';
import { SetState } from '../../types/types';

import s from './Received.module.scss';

interface ReceivedProps {
   setIsOrder: SetState<boolean>;
}

// Окно об успешном заказе
const Received: React.FC<ReceivedProps> = ({ setIsOrder }) => {
   const dispatch = useAppDispatch();
   return (
      <article className={s.received}>
         <div className={s.container} />
         <div className={s.receivedContent}>
            <h2>Заказ принят!</h2>
            <Link
               to='/'
               onClick={() => {
                  setIsOrder(false);
                  dispatch(clearCart());
               }}
            >
               <button className={s.receivedContent__Button}>Ok</button>
            </Link>
         </div>
      </article>
   );
};

export default Received;
