import { Link } from 'react-router-dom';
import gitImg from '/git.svg';
import { useLocation } from 'react-router-dom';

function FooterBar() {
  const location = useLocation();
  switch (location.pathname) {
    case '/lumieleu/':
      return null;

    default:
  }

  return (
    <footer className="flex justify-around text-xs py-[30px] ali border-t-2">
      <p className="font-bold text-center ">
        lumière <br /> de l&#39;aube
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <dl className="flex gap-1 ">
            <dt>LDL STUDIO : </dt>
            <dd>서울특별시 종로구 종로3길 17 D타워, 16-17층</dd>
          </dl>
        </li>
        <li>
          <dl className="flex gap-1">
            <dt>TEL : </dt>
            <dd>+82 123 4567</dd>
          </dl>
        </li>
        <li>
          <dl className="flex gap-1">
            <dt>OPEN : </dt>
            <dd>10 AM - 6 PM</dd>
          </dl>
        </li>
        <li>
          <dl className="flex gap-1">
            <dt>MAIL : </dt>
            <dd>Info@naver.com</dd>
          </dl>
        </li>
      </ul>

      <dl className="grid grid-cols-3 grid-rows-3 gap-x-2 h-[60px]">
        <dt className="row-span-3">DEVELOPER</dt>
        <dd>Bang Seo Bin</dd>
        <dd>Shin Dong Hyuk</dd>
        <dd>Song Young Eun</dd>
        <dd>Chung Min Jee</dd>
        <dd>Shin Hyun Ju</dd>
      </dl>

      <dl className="flex gap-5">
        <dt>PHOTO BY</dt>
        <dd>Chung Min Jee</dd>
      </dl>

      <Link>
        <img src={gitImg} alt="git" />
      </Link>
    </footer>
  );
}

export default FooterBar;
