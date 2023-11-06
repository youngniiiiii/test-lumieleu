import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex justify-around text-xs">
      <p className="font-bold text-center">
        lumière <br /> de l&#39;aube
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <dl className="flex ">
            <dt>LDL STUDIO : </dt>
            <dd>서울특별시 종로구 종로3길 17 D타워, 16-17층</dd>
          </dl>
        </li>
        <li>
          <dl className="flex">
            <dt>TEL : </dt>
            <dd>+82 123 4567</dd>
          </dl>
        </li>
        <li>
          <dl className="flex">
            <dt>OPEN : </dt>
            <dd>10 AM - 6 PM</dd>
          </dl>
        </li>
        <li>
          <dl className="flex">
            <dt>MAIL : </dt>
            <dd>Info@naver.com</dd>
          </dl>
        </li>
      </ul>
      <dl className="flex flex-col gap-1 flex-wrap h-[60px]">
        <dt className=" h-[60px] ">DEVELOPER</dt>
        <dd>Bang Seo Bin</dd>
        <dd>Shin Dong Hyuk</dd>
        <dd>Song Young Eun</dd>
        <dd>Chung Min Jee</dd>
        <dd>Shin Hyun Ju</dd>
      </dl>

      <dl className="flex">
        <dt>PHOTO BY</dt>
        <dd>Chung Min Jee</dd>
      </dl>

      <Link>
        <img src="" alt="git" />
      </Link>
    </footer>
  );
}

export default Footer;
