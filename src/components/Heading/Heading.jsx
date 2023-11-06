import Nav from '@/layout/Nav/Nav';
import S from './Heading.module.css';
import { useLocation, Link } from 'react-router-dom';

function Heading() {
  const location = useLocation();

  const getSectionClass = (location) => {
    switch (location) {
      case '/':
        return [S.textWhite, S.textWhite];
      case '/login':
      case '/signup':
        return [S.bgBlack, S.bgWhite];
      default:
        return [S.bgWhite, S.bgWhite];
    }
  };

  const [logoSectionClass, navSectionCalss] = getSectionClass(
    location.pathname
  );

  return (
    <div className={S.headingWrapper}>
      <div className={`${S.logoSection} ${logoSectionClass}`}>
        <Link to="/" className={location.pathname === '/' ? '' : 'font-bold'}>
          lumière <br /> de l&#39;aube
        </Link>
      </div>
      <div className={`${S.navSection} ${navSectionCalss}`}>
        <Nav />
      </div>
    </div>
  );
}

export default Heading;
