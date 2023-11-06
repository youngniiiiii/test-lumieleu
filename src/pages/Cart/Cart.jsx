import S from './Cart.module.css';
import SelectedProduct from '@/components/SelectedProduct/SelectedProduct';

function Cart() {
  return (
    <div className={S.cartWrapper}>
      <SelectedProduct />
    </div>
  );
}

export default Cart;
