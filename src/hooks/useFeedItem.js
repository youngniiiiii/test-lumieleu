import useFetchData from './useFetchData';

const getEndpoint = (feedId) =>
  `${import.meta.env.VITE_PB_API}/collections/posts/records/${feedId}`;

function useFeedItem(feedId) {
  return useFetchData(getEndpoint(feedId));
}

export default useFeedItem;
