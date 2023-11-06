import useFetchData from '@/hooks/useFetchData';

const getEndpoint = (productId) =>
  `${import.meta.env.VITE_PB_API}/collections/products/records/${productId}`;

function useProductItem(productId) {
  const responseData = useFetchData(getEndpoint(productId));
  return responseData;
}

export default useProductItem;
