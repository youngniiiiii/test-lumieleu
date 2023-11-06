import { getPbProductImageURL } from '@/utils';
import MyPageButton from './MyPageButton';
import { array } from 'prop-types';

function OrderedProduct({ item }) {
  let orderDate = item.created.split(" ")[0];
  // console.log(item.expand.order[0].id)

  return (
    <>
      <div className="flex justify-between text-sm px-1">
        <p>주문번호 {item.id}</p>
        <p>주문일자 {orderDate}</p>
      </div>
      <div className="flex gap-4 justify-between items-center border border-black rounded px-6 py-4">
        <img
          src={getPbProductImageURL(item, item.expand.product.image)}
          alt={`${item.expand.product.title}`}
          className="w-24 h-36 border"
        />
        <dl className="text-sm">
          <dt className="font-semibold text-base">
            {item.expand.product.title}
          </dt>
          <dd>
            {item.selectedTotal}원 / {item.selectedQuantity}개
          </dd>
          <dt className="font-semibold">받는사람</dt>
          <dd>{item.receiver}</dd>
          <dt className="font-semibold">받는주소</dt>
          <dd>{item.shippingAddress}</dd>
        </dl>
        <div className="">배송완료</div>
        <div className="flex flex-col gap-2">
          <MyPageButton text="구매평 작성" />
          <MyPageButton text="배송조회" />
        </div>
      </div>
    </>
  );
}

OrderedProduct.propTypes = {
  item : array
};

export default OrderedProduct