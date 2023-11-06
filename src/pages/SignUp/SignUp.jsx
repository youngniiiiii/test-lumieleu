import Button from '@/components/Button';
import S from '@/pages/LogIn/LogIn.module.css';
import { engReg, pwReg } from '@/utils/validation';
import debounce from '@/utils/debounce';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/FormInput/FormInput';
import useAuthStore from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useId } from 'react';
import pb from '@/api/pocketbase';

// lable , input map 배열
const inputProps = [
  {
    label: '아이디',
    placeholder: '아이디(영문)를 입력해 주세요',
    name: 'username',
  },

  {
    label: '비밀번호',
    placeholder: '10자-14자, 알파벳 1개, 특수문자 1개 포함',
    name: 'password',
    type: 'password',
  },
  {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 한번더 입력해 주세요',
    name: 'passwordConfirm',
    type: 'password',
  },
  {
    label: '이름',
    placeholder: '이름을 입력해 주세요',
    name: 'name',
  },
  {
    label: '이메일',
    placeholder: '이메일을 입력해 주세요 ',
    name: 'email',
    type: 'email',
  },

  {
    label: '휴대전화',
    placeholder: '연락처(숫자만)를 입력해 주세요 ',
    name: 'phoneNumber',
  },
  {
    label: '주소',
    placeholder: '주소를 입력해 주세요 ',
    name: 'address',
  },
];

// ID , email 중복체크
const checkIfIdOrEmailExists = async (username, email) => {
  try {
    const idExists = await pb.collection('users').getList(1, 50, {
      filter: `username = "${username}"`,
    });

    const emailExists = await pb.collection('users').getList(1, 50, {
      // filter: `email = "${email}"`,
    });

    console.log(emailExists);

    return {
      idExists: idExists.totalItems,
      emailExists: emailExists.totalItems,
    };
  } catch (error) {
    console.error('아이디 및 이메일 존재 여부 확인 중 오류 발생:', error);
    throw error;
  }
};

function SignUp() {
  /* Input 사용자 입력 값 감지 */
  const initalState = {
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    address: '',
    emailVisibility: true,
  };
  const [formState, setFormState] = useState(initalState);
  const { name, username, password, passwordConfirm, email } = formState;

  // input의 onChange , 0.5초 이후에 리랜더링 되도록 debounce
  const handleInput = (e) => {
    const { name, value } = e.target;

    // 전화번호 입력일 경우 하이픈 제거
    if (name === 'phoneNumber') {
      const phoneNumberWithoutHyphen = value.replace(/-/g, '');
      setFormState({ ...formState, [name]: phoneNumberWithoutHyphen });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };
  const handleDebounceInput = debounce(handleInput, 500);

  /* 회원가입 시 유효성 검사 */
  const validateSignUp = async () => {
    if (!pwReg(password)) {
      toast.error(
        '비밀번호는 10자리 이상, 14자리이하 하나의 알파벳 문자를 포함하는 특수문자를 입력해주세요!',
        { duration: 3000 }
      );
      throw new Error(
        '비밀번호는 10자리 이상, 14자리이하 하나의 알파벳 문자를 포함하는 특수문자를 입력해주세요!',
        { duration: 3000 }
      );
    }
    if (!engReg(username)) {
      toast.error('아이디는 영문과 숫자로만 입력해주세요', { duration: 1000 });
      throw new Error('이미 존재하는 아이디 입니다');
    }
    if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다!', { duration: 1000 });
      throw new Error('비밀번호가 일치하지 않습니다!');
    }
    // 존재하는 아이디 toast.error('ID가 존재합니다.', { duration: 1000 })

    // const isIdExists = await checkIfIdExists(username);
    // if (isIdExists) {
    //   toast.error('ID가 이미 존재합니다.', { duration: 1000 });
    //   throw new Error('ID가 이미 존재합니다.');
    // }
    // 아이디와 이메일이 이미 존재하는지 확인
    const { idExists, emailExists } = await checkIfIdOrEmailExists(
      username,
      email
    );
    console.log(idExists);
    console.log(emailExists);

    if (idExists) {
      toast.error('ID가 이미 존재합니다.', { duration: 1000 });
      throw new Error('ID가 이미 존재합니다.');
    }

    if (emailExists) {
      toast.error('이미 존재하는 이메일입니다.', { duration: 1000 });
      throw new Error('이미 존재하는 이메일입니다.');
    }
  };

  // const checkIfIdExists = async (username) => {
  //   //  서버와 통신하여 아이디 존재 여부확인
  //   const usersListData = await pb.collection('users').getList(1, 50, {
  //     filter: `username = "${username}"`,
  //   });
  //   //  usersListData 가 존재하면 true 설정
  //   if (usersListData.totalItems) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // 전송버튼 클릭시
  const signUp = useAuthStore((state) => state.signUp);
  const logIn = useAuthStore((state) => state.logIn);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      // 비밀번호 일치하는지 확인
      validateSignUp();
      await signUp(formState);
      await logIn(username, password);
    } catch (error) {
      console.error('Error during registration:', error);
    }
    // console.log(formState);
  };

  useEffect(() => {
    if (user) {
      toast.success(`반갑습니다 ${name} 님! 회원가입이 완료되었습니다. `, {
        duration: 1000,
      });
      navigate('/lumieleu/');
    }
  }, [name, navigate, user]);

  /* 체크 박스 데이터를 담을 배열 */
  const [checkboxData, setCheckboxData] = useState([
    {
      id: 'termsOfService',
      labelText: '[필수] 서비스 이용약관 동의',
      className: 'mr-1',
      required: true,
      name: 'termsOfService',
      checked: false,
    },
    {
      id: 'privacyPolicy',
      labelText: '[필수] 개인정보 수집 및 이용 동의',
      className: 'mr-1',
      required: true,
      name: 'privacyPolicy',
      checked: false,
    },
    {
      id: 'ageConfirmation',
      labelText: '[선택] 쇼핑정보 수신 동의',
      className: 'mr-1',
      required: true,
      name: 'ageConfirmation',
      checked: false,
    },
    {
      id: 'marketingInfo',
      labelText: '[선택] SMS 수신을 동의하십니까?',
      className: 'mr-1',
      name: 'marketingInfo',
      checked: false,
    },
  ]);

  /*체크 박스 단일 선택 시 */
  const handleSingleCheck = (name) => {
    setCheckboxData((prevData) =>
      prevData.map((checkbox) =>
        checkbox.name === name
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  /* 체크 박스 전체 선택 */
  const handleAllCheck = (selectAll) => {
    const updatedCheckboxData = checkboxData.map((checkbox) => ({
      ...checkbox,
      checked: selectAll,
    }));
    setCheckboxData(updatedCheckboxData);
  };
  const id = useId();

  return (
    <>
      <section className="h-screen">
        {/* 왼쪽영역 */}
        <div className="p-24 overflow-hidden bg-black text-white w-1/2 h-screen py-24 fixed top-0 left-0">
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
        {/* 오른쪽영역 */}
        <div className=" w-1/2 float-right p-24 flex flex-col items-center justify-center bg-white z-10">
          <h2 className="text-5xl mb-8 font-semibold text-[#454444]">Signin</h2>
          {/* input */}
          <form
            onSubmit={handleRegister}
            className={`max-w-[53.75rem] mx-auto w-full flex flex-col items-center gap-1`}
          >
            {inputProps?.map(({ label, type, placeholder, name }) => {
              return (
                <FormInput
                  key={name}
                  defaultValue={formState[name]}
                  onChange={handleDebounceInput}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  name={name}
                />
              );
            })}

            {/* 체크박스 */}
            <div>
              <div>
                <input
                  id={id}
                  type="checkbox"
                  className="mr-1"
                  checked={checkboxData.every((checkbox) => checkbox.checked)}
                  onChange={() =>
                    handleAllCheck(
                      !checkboxData.every((checkbox) => checkbox.checked)
                    )
                  }
                />
                <label htmlFor={id} type="checkbox">
                  전체 동의합니다.
                </label>
              </div>
              {checkboxData.map(
                ({ labelText, className, required, name, checked, id }) => (
                  <div key={id}>
                    <input
                      id={id}
                      type="checkbox"
                      required={required}
                      checked={checked}
                      className={className}
                      onChange={() => handleSingleCheck(name)}
                    />
                    <label htmlFor={id}>{labelText}</label>
                  </div>
                )
              )}
            </div>

            <Button type="submit" color="black" className="w-[25rem] my-5">
              가입하기
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
