import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';

export default function PageHead({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`포스트, 예술, 사진 ${keywords}`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${import.meta.env.VITE_DOMAIN}/lumieleu.jpg`}
      />
      <meta property="og:url" content={`${import.meta.env.VITE_DOMAIN}/`} />
    </Helmet>
  );
}

PageHead.propTypes = {
  title: string.isRequired,
  keywords: string,
  description: string,
};
