import Button from '@/components/Button';
import { useId } from 'react';
import { useState } from 'react';
import S from './LogIn.module.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/store';
import { useEffect } from 'react';
import { userNameReg, pwReg } from '@/utils';
import debounce from '@/utils/debounce';
import EyeClosed from '@/components/EyeClosed';
import EyeOpen from '@/components/EyeOpen';

function Login() {
  const id = useId();
  /* username Password 유효성 검사 및 조건부 렌더링 함수 */
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handleInput = debounce((e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'username') {
      setIsUserNameValid(userNameReg(value));
    } else if (name === 'password') {
      setIsPasswordValid(pwReg(value));
    }
  });

  /* PB Data 접근 및 해당 로그인 */
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.logIn);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      toast.success(`${user.username}님 환영합니다.`, {
        duration: 1000,
      });
      navigate('/');
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { username, password } = formData;
      await logIn(username, password);
    } catch (error) {
      toast.error('아이디와 패스워드를 다시 확인해주세요', {
        duration: 2000,
      });
      throw new Error(error);
    }
  };

  /* 회원가입 페이지 이동 */
  const handleMoveSignUp = () => {
    navigate('/signup');
  };

  /* Eye Component 상태에 따른 비밀번호 보이기/보이지 않기 */
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  /* KaKao 사용자 로그인 */
  const kakaoLogIn = useAuthStore((state) => state.SignWithKaKao);
  const handleLoginKakao = async () => {
    await kakaoLogIn();
  };

  return (
    <>
      <section className="flex flex-1 h-screen">
        <div className="flex-1 p-24 bg-black text-white py-24 relative">
          <p className="absolute bottom-48 left-7 text-6xl font-light">
            lumière de l&lsquo;aube
          </p>
          <p className="absolute bottom-32 left-8 font-thin">
            Lorem Ipsum is simply dummy text of the printing and tyunce with
            <br></br>
            righteous indignation and dislike men who are so beguiled and
          </p>
          <div className="flex">
            <div className={S.solid}></div>
            <div className={S.dashed}></div>
            <div className={S.solid}></div>
          </div>
        </div>
        <div className="flex-1 px-24 flex flex-col items-center justify-center bg-white z-10">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-5"
          >
            <h2 className="text-5xl font-semibold mb-6 text-[#454444]">
              Login
            </h2>
            <div>
              <label htmlFor="username"></label>
              <input
                onChange={handleInput}
                name="username"
                id="username"
                type="text"
                placeholder="아이디를 입력해 주세요"
                className="border w-[25rem] h-[3.125rem] pl-5 "
              />
            </div>
            <div>
              <div className="flex relative">
                <label htmlFor={id}></label>
                <input
                  className="border  w-[25rem] h-[3.125rem] pl-5 "
                  onChange={handleInput}
                  name="password"
                  id={id}
                  placeholder="비밀번호를 입력해 주세요"
                  type={isPasswordVisible ? 'text' : 'password'}
                />
                {isPasswordVisible ? (
                  <EyeClosed
                    className="absolute right-0 top-0 transform -translate-x-1/2 mt-3"
                    onClick={handlePasswordVisible}
                  />
                ) : (
                  <EyeOpen
                    className="absolute right-0 top-0 transform -translate-x-1/2 mt-3"
                    onClick={handlePasswordVisible}
                  />
                )}
              </div>
              {!isPasswordValid && (
                <span className="text-red-600">
                  <br></br>
                  비밀번호는 10자 이상, 특수문자 하나이상을 입력해 주세요
                </span>
              )}
            </div>
            <Button type="submit" color="black" className="w-[25rem]">
              로그인
            </Button>
            <Button color="yellow" onClick={handleLoginKakao}>
              카카오톡 로그인
            </Button>
            <Button
              color="white"
              className="w-[25rem]"
              onClick={handleMoveSignUp}
            >
              회원가입
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
