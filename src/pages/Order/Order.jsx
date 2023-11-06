import S from './Order.module.css';
import OrderList from '@/components/OrderList/OrderList';

function Order() {
  return (
    <>
      <div className={S.OrderWrapper}>
        <OrderList />
      </div>
    </>
  );
}

export default Order;
