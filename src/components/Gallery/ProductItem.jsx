import { getPbImageURL } from '@/utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductItem({ products, index }) {
  const isOddIndex = index % 2 !== 0;

  return (
    <div style={{ marginTop: isOddIndex ? '144px' : '0' }}>
      <Link to={`/productdetails/${products.id}`}>
        <h3 className="text-[80px]">{`0${index + 1}`}</h3>
        <div className="overflow-hidden">
          <img
            src={getPbImageURL(products, 'image')}
            alt={products.title}
            className="w-full transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <p className="mt-[10px]">{products.title}</p>
        <p className="">{products.photographer}</p>
        <p className="text-xs mt-[5px]">{products.production_date}</p>
      </Link>
    </div>
  );
}

ProductItem.propTypes = {
  products: PropTypes.object,
  index: PropTypes.number,
};

export default ProductItem;
