import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hooks';
import { clearCart } from '../../stores/mainSlice';

import s from './Received.module.scss';

interface ReceivedProps {
   setIsOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

// Окно об успешном заказе
const Received: React.FC<ReceivedProps> = ({ setIsOrder }) => {
   const dispatch = useAppDispatch();
   return (
      <div className={s.received}>
         <div className={s.container} />
         <div className={s.receivedContent}>
            <div>Заказ принят!</div>
            <Link
               to='/'
               onClick={() => {
                  setIsOrder(false);
                  dispatch(clearCart());
               }}
            >
               <div className={s.receivedContent__Button}>Ok</div>
            </Link>
         </div>
      </div>
   );
};

export default Received;
