import useOrderedProduct from '@/hooks/useOrderedProduct.js';
import OrderedProduct from './OrderedProduct';
import Spinner from '../Spinner';
// import { useId } from 'react';

function OrderedProductList() {
  const { data, isLoading, error } = useOrderedProduct();
  let orderedList = [];
  // const productId = useId();

  data?.forEach((item) => orderedList = [...orderedList, item]);
  console.log('됐니?')
  console.log(orderedList)

  if (isLoading) {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // return <>{orderedList.map((item) => console.log(item.expand.order[0]))}</>
  return <>{orderedList.map((item)=> <OrderedProduct key={item.id} item={item}/>)}</>
}

export default OrderedProductList