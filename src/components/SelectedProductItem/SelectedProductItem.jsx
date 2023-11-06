import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPbImageURL } from '@/utils';
import { useEffect, useState } from 'react';
import S from './SelectedProductItem.module.css';
import Addittion from '/Addition.svg';
import Subtract from '/Subtract.svg';
import Delete from '/Delete.svg';

function SelectedProductItem({
  filteredItem,
  expandProduct,
  restExpandItem,
  index,
  decreaseCount,
  increaseCount,
  deleteItem,
  individualProductedTotalPrice,
}) {
  console.log('expandProduct:', expandProduct);
  console.log('restExpandItem:', restExpandItem);
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    const newProductArray = expandProduct.map((item) => {
      return {
        id: item.id,
        title: item.title,
        size: item.size,
      };
    });
    setProductArray(newProductArray);
  }, [expandProduct]);

  const idArray = productArray.map(({ id }) => id);
  const titleArray = productArray.map(({ title }) => title);
  const sizeArray = productArray.map(({ size }) => size);

  console.log('idArray:', idArray);
  console.log('titleArray:', titleArray);
  console.log('sizeArray:', sizeArray);

  expandProduct.forEach((item) => {
    const imageURLs = getPbImageURL(item, 'image');
    console.log('imageURLs:', imageURLs);
  });

  return (
    <>
      <ul className="flex">
        <li>
          <div className="w-[960px] border-t-2 border-black ml-6"></div>
          <div className="flex mt-5 mb-5 ml-10">
            <Link to={`/productdetails/${idArray}`}>
              <div className="flex w-[12rem]">
                {expandProduct.map((item, index) => {
                  const imageURLs = getPbImageURL(item, 'image');
                  console.log('imageURLs:', imageURLs);
                  return imageURLs.map((url, urlIndex) => (
                    <img
                      key={`${item.id}-${index}-${urlIndex}`}
                      src={url}
                      alt={item.title}
                      className={`${S.selectedImage} mr-10`}
                    />
                  ));
                })}
                <span>{`${titleArray}`}</span>
              </div>
            </Link>
            <span className="w-[13rem] flex justify-end">{`${sizeArray}`}</span>
            <div className="flex">
              <span className="w-[19rem] flex justify-end">{`${filteredItem?.selectedPrice.toLocaleString(
                'ko-KR'
              )}`}</span>
              <div className="flex ml-[1.5rem]">
                <button
                  className="h-[1.5rem]"
                  onClick={() => decreaseCount(index)}
                >
                  <img src={Subtract} alt="빼기" />
                </button>
                <span className="w-[3.5rem] px-3 flex justify-center">
                  {filteredItem?.count}
                </span>
                <button
                  className="h-[1.5rem]"
                  onClick={() => increaseCount(index)}
                >
                  <img src={Addittion} alt="추가" />
                </button>
                <span className="w-[5rem] ml-[1.8rem]">{`${individualProductedTotalPrice.toLocaleString(
                  'ko-KR'
                )}`}</span>
                <button
                  className="h-[1.5rem] ml-[1.3rem]"
                  onClick={() => deleteItem(index)}
                >
                  <img src={Delete} alt="삭제" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default SelectedProductItem;

SelectedProductItem.propTypes = {
  decreaseCount: PropTypes.func.isRequired,
  increaseCount: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  individualProductedTotalPrice: PropTypes.number.isRequired,
  filteredItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    selectedPrice: PropTypes.number.isRequired,
    selectedSubtotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};
