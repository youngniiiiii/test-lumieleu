import { useQuery } from '@tanstack/react-query';
import pb from '@/api/pocketbase';
import SelectedProductItem from '@/components/SelectedProductItem/SelectedProductItem';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import useStorage from '@/hooks/useStorage';

function SelectedProduct() {
  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);

  useEffect(() => {
    setAuthUserData(storageData?.model);
  }, [storageData?.model]);

  const authUserDataId = authUserData?.id;

  async function fetchCartData() {
    const userCartData = await pb.collection('cart').getFullList({
      filter: `user = '${authUserDataId}' && pendingOrders = 'true'`,
      expand: 'user, product',
      requestKey: null,
    });

    return userCartData;
  }

  const [selectedCartData, setSelectedCartData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productedTotalPrice, setProductedTotalPrice] = useState([]);
  const [reverseIndex, setReverseIndex] = useState([]);


  const {
    isLoading,
    data: cartData,
    error,
  } = useQuery(['cart'], () => fetchCartData(), {
    retry: 2,
  });

  let dataItems = cartData || [];

  console.log('cartData:', cartData);
  console.log('dataItems:', dataItems);
  useEffect(() => {
    const updateFilteredData = () => {
      if (dataItems && dataItems.length > 0) {
        const initialCartItems = dataItems.map((item) => ({
          ...item,
          count: item.selectedQuantity === 0 ? 1 : item.selectedQuantity,
        }));
        setCartItems(initialCartItems);
        setSelectedCartData(initialCartItems);

        console.log('Updating cartItems...');
        console.log('cartItems:', initialCartItems);
      }
    };
    if (!isLoading) {
      updateFilteredData();
    }
  }, [cartData, setCartItems, setSelectedCartData, dataItems]);

  useEffect(() => {
    console.log('cartItems:', cartItems);
  });

  const increaseCount = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;
    setReverseIndex(reverseIndex);

    const currentCartItem = cartItems[reverseIndex];
    const updatedCount = currentCartItem.count + 1;
    const increaseCountTotalPrice =
      currentCartItem.selectedPrice * updatedCount;

    const updatedCartItem = {
      ...currentCartItem,
      count: updatedCount,
      selectedSubtotal: increaseCountTotalPrice,
    };

    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[reverseIndex] = updatedCartItem;

      return newItems;
    });

    await pb.collection('cart').update(updatedCartItem.id, {
      selectedQuantity: updatedCartItem.count,
      selectedSubtotal: increaseCountTotalPrice,
    });

    setProductedTotalPrice((prevPrices) => {
      const updatedPrices = prevPrices.map((price, index) => {
        if (index === itemIndex) {
          return increaseCountTotalPrice;
        } else {
          return price;
        }
      });

      return updatedPrices;
    });
  };

  const decreaseCount = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;
    const currentCartItem = cartItems[reverseIndex];

    if (currentCartItem.count <= 1) {
      return;
    }

    const updatedCount = currentCartItem.count - 1;
    const increaseCountTotalPrice =
      currentCartItem.selectedPrice * updatedCount;

    const updatedCartItem = {
      ...currentCartItem,
      count: updatedCount,
      selectedSubtotal: increaseCountTotalPrice,
    };

    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[reverseIndex] = updatedCartItem;

      return newItems;
    });

    await pb.collection('cart').update(updatedCartItem.id, {
      selectedQuantity: updatedCartItem.count,
      selectedSubtotal: increaseCountTotalPrice,
    });

    setProductedTotalPrice((prevPrices) => {
      const updatedPrices = prevPrices.map((price, index) => {
        if (index === itemIndex) {
          return increaseCountTotalPrice;
        } else {
          return price;
        }
      });

      return updatedPrices;
    });
  };

  useEffect(() => {
    const initialCartItems = selectedCartData.map((item) => ({
      ...item,
      count: item.selectedQuantity || 1,
    }));
    setCartItems(initialCartItems);
  }, [selectedCartData]);

  const calculateTotalPrice = () => {
    let calculatedTotalPrice = 0;

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const count = item.count || item.selectedQuantity || 1;
        const selectedPrice = item.selectedPrice || 0;
        calculatedTotalPrice += selectedPrice * count;
      });
    }
    return calculatedTotalPrice;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
  });

  const deleteItem = async (itemIndex) => {
    const reverseIndex = cartItems.length - 1 - itemIndex;

    if (reverseIndex < 0 || reverseIndex >= selectedCartData.length) {
      console.log('Error: Reverse index is out of range.');
      return;
    }

    const updatedCartItems = [...cartItems];

    if (reverseIndex >= updatedCartItems.length || reverseIndex < 0) {
      console.log('Error: Item does not exist in cartItems.');
      return;
    }

    const currentCartItem = updatedCartItems[reverseIndex];

    if (!currentCartItem || !currentCartItem.id) {
      console.log('Error: Item or item id is undefined.');
      return;
    }

    const itemId = currentCartItem.id;

    await pb.collection('cart').delete(itemId);

    let updatedCartData = [...selectedCartData];
    updatedCartData.splice(reverseIndex, 1);

    setCartItems(updatedCartItems);
    setSelectedCartData(updatedCartData);
  };

  useEffect(() => {
    console.log('selectedCartData:', selectedCartData);
  });

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

  return (
    <>
      <h2 className="sr-only">장바구니 페이지</h2>
      <span
        className="text-[20px] font-bold mt-[10rem] mb-[4.5rem]"
        aria-label="장바구니"
        aria-hidden
      >
        C H E C K O U T
      </span>
      <ul className="w-[930px] flex pb-2">
        <li className="ml-2 mr-[37.5rem]">
          <span className="font-semibold">Product</span>
        </li>
        <li className="mr-9">
          <span className="font-semibold">Price</span>
        </li>
        <li className="mr-9">
          <span className="font-semibold">Quantity</span>
        </li>
        <li>
          <span className="font-semibold">Subotal</span>
        </li>
      </ul>
      <div>
        {cartItems.length === 0 && !isLoading ? (
          <>
            <div className="w-[960px] border-t-2 border-black ml-6"></div>
            <div className="h-[20rem] flex flex-col justify-center items-center">
              <span>장바구니가 비어있습니다.</span>
            </div>
          </>
        ) : (
          <>
            {cartItems?.toReversed().map((item, index) => {
              const cartItem = cartItems.find(
                (cartItem) => cartItem.id === item.id
              );
              if (cartItem) {
                const itemWithCount = {
                  ...item,
                  count: cartItem.count,
                };
                const {
                  expand: { product, ...restExpand },
                } = itemWithCount;
                console.log('product:', product);
                console.log('restExpand:', restExpand);
                const reverseIndex = cartItems.length - 1 - index;
                const individualProductedTotalPrice =
                  productedTotalPrice.length > reverseIndex
                    ? productedTotalPrice[reverseIndex]
                    : cartItem.selectedSubtotal;
                return (
                  <SelectedProductItem
                    key={item.id}
                    filteredItem={itemWithCount}
                    restExpandItem={restExpand}
                    expandProduct={product}
                    index={index}
                    deleteItem={deleteItem}
                    individualProductedTotalPrice={
                      individualProductedTotalPrice
                    }
                    increaseCount={() => increaseCount(index)}
                    decreaseCount={() => decreaseCount(index)}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      <div className="flex flex-col ml-[32rem] mt-10 mb-10">
        <span className="text-[20px] font-semibold">Cart Total</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[16px] font-semibold">Subtotal</span>
        <div className="w-[25rem] border-t-2 border-black"></div>
        <span className="text-[16px] font-semibold">Total</span>
        <div className="w-[25rem] mb-6 border-t-2 border-black"></div>
        <div className="flex justify-end">
          <span className="text-[20px] font-semibold">
            {`${totalPrice.toLocaleString('ko-KR')}`} 원
          </span>
        </div>
      </div>
      <div className="ml-[32rem]">
        <Link
          to={
            selectedCartData.length === 0 ? '/lumieleu/cart' : '/lumieleu/order'
          }
        >
          <button
            className={`text-white bg-black
              w-[25rem] h-[3.125rem] mb-[5rem] rounded-md`}
          >
            PROCEEO TO CHECKOUT
          </button>
        </Link>
      </div>
    </>
  );
}

export default SelectedProduct;
