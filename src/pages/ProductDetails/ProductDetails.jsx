import OrderExchange from '@/components/ProductDetails/OrderExchange';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useProductItem from '@/utils/useProductItem';
import { getPbImageURL } from '@/utils';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ProductDetails() {
  const { productId } = useParams();
  const { data } = useProductItem(productId);

  // 제품 정보 데이터
  const productInfo = [
    { label: 'Price', value: `KRW ${data.price}` },
    { label: 'Size', value: `${data.size}` },
    { label: 'Texture', value: `${data.texture}` },
  ];

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    if (data && data.price) {
      const price = data.price.replace(/[^\d]/g, '');
      setTotalPrice(Number(price) * quantity);
    }
  }, [data, quantity]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!data || !data.price || !data.size || !data.texture) {
    return null;
  }

  return (
    <main className="h-screen flex items-center justify-center">
      {/* 제품 이미지와 캡션 */}
      <figure className="m-10">
        <img
          src={getPbImageURL(data, 'image')}
          alt={data.title}
          className="w-[350px]"
        />
        <figcaption className="mt-1">
          {data.title} <br /> photo by {data.photographer} <br />
          <span className="text-xs mt-[5px]">{data.production_date}</span>
        </figcaption>
      </figure>

      {/* 제품 설명 및 상세 정보 */}
      <section className="w-[320px] h-[573px] flex flex-col">
        {/* 제품 설명 */}
        <article className="h-[322px] flex-grow text-justify">
          {data.description}
        </article>
        {/* 제품 상세 정보 */}
        <section className="mb-4">
          {/* 제목 */}
          <h3 className="border-b-2 border-gray-600 mb-2 pb-2">{data.title}</h3>

          {/* 가격, 사이즈, 재질 등의 정보 표시 */}
          {productInfo.map((data) => (
            <dl
              key={data.label}
              className="border-b-2 border-gray-600 mb-2 flex justify-between pb-2"
            >
              <dt>{data.label}</dt>
              <dd>{data.value}</dd>
            </dl>
          ))}
        </section>
        <p className="font-semibold mb-1">{data.title}</p>
        {/* 수량 체크 */}
        <div className="flex justify-between ml-1 mb-4">
          <span className="flex gap-2 p-1">
            <button onClick={decreaseQuantity}>-</button>
            <p>{quantity}</p>
            <button onClick={increaseQuantity}>+</button>
          </span>
          <span>KRW {totalPrice && totalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between w-full">
          <Link
            to={`/lumieleu/order`}
            className="mr-2 basis-2/3 bg-black text-white h-[50px] rounded-md flex items-center justify-center"
          >
            <button>구매하기</button>
          </Link>
          <Link
            to={`/lumieleu/cart`}
            className="basis-1/3 border-2 border-black rounded-md h-[50px] flex items-center justify-center"
          >
            <button>장바구니</button>
          </Link>
        </div>
        <div className="flex gap-11 justify-center">
          {/* 교환 / 주문 모달 창 */}
          <OrderExchange />
        </div>
      </section>
    </main>
  );
}
