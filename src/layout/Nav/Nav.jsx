// import S from './Nav.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/store';
import React from 'react';
import CSS from './Nav.module.css';
import { useNavigate } from 'react-router-dom';
import { kakaoLogout } from '@/utils/kakaoLogout';

function Nav() {
  const location = useLocation();
  const Navigate = useNavigate();

  const categories = ['ABOUT', 'GALLERY', 'CART', 'MYPAGE', 'LOGIN'];
  /* 인증 정보에 따른 로그인 ➡️ 로그아웃으로 변경 */
  const isAuth = useAuthStore((state) => state.isAuth);

  /* 로그인 시 userName || name렌더링 */
  const user = useAuthStore((state) => state.user);

  /* 일반사용자 로그아웃 및 카카오 사용자 로그아웃 */
  const signOut = useAuthStore((state) => state.signOut);
  const handleSignOut = () => {
    toast.success('정상적으로 로그아웃 되었습니다.', { duration: 1000 });
    signOut();
    kakaoLogout();
    Navigate('/lumieleu/');
  };

  const activeClass = (category) => {
    if (location.pathname === `/lumieleu/`) {
      return `${CSS.hoverunderbarWhite}`;
    } else {
      return `${
        location.pathname.toUpperCase().includes(category) ? CSS.underbar : ''
      } ${CSS.hoverunderbar}`;
    }
  };

  // const hoverClass = 0;

  return (
    <nav>
      <ul className="flex flex-wrap gap-5 justify-evenly border-gray-1 top-13">
        {/* categories가 LOGIN이 아닌 경우 필터, 맵  */}
        {categories
          .filter((category) => category !== 'LOGIN')
          .map((category) => (
            <li key={category} className="">
              <Link
                to={`/lumieleu/${category.toLowerCase()}`}
                className={activeClass(category)}
              >
                {category}
              </Link>
            </li>
          ))}
        {/* categories가 LOGIN일 경우 필터, isAuth 로그인상태일시 ~님 나오게 하기, 로그아웃버튼 생성 맵 실행  */}
        {categories
          .filter((category) => category === 'LOGIN')
          .map((category) => (
            <React.Fragment key={category}>
              {isAuth && user && <li>{user.name} 님</li>}
              {isAuth ? (
                <div
                  className={`${activeClass(category)} cursor-pointer`}
                  onClick={handleSignOut}
                >
                  LOGOUT
                </div>
              ) : (
                <Link to="login" className={activeClass(category)}>
                  LOGIN
                </Link>
              )}
            </React.Fragment>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
