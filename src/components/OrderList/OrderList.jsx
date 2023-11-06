import { useState, useEffect, useCallback } from 'react';
import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import useStorage from '@/hooks/useStorage';
import {
  emailReg,
  userNameReg,
  shippingPostCodeReg,
  shippingAddressReg,
  shippingAddressDetailsReg,
  phoneNumberFirstReg,
  phoneNumberSecondReg,
  phoneNumberThirdReg,
  landlinePhoneFirstReg,
  landlinePhoneSecondReg,
  landlinePhoneThirdReg,
} from '@/utils/validation';
import S from './OrderList.module.css';
import useStorage from '@/hooks/useStorage';

function OrderList() {
  const navigate = useNavigate();

  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [updateRestExpand, setUpdateRestExpand] = useState([]);

  useEffect(() => {
    setAuthUserData(storageData?.model);
  }, [storageData?.model]);

  const authUserDataId = authUserData?.id;
  console.log(authUserDataId);

  const [userData, setUserData] = useState([]);
  const [selectedCartData, setSelectedCartData] = useState([]);
  const [saveUserId, setSaveUserId] = useState('');
  const [userDataItems, setUserDataItems] = useState([]);

  const [sameAsMember, setSameAsMember] = useState(true);
  const [newAddress, setNewAddress] = useState('');

  function sample6_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        setFormState((prevState) => ({
          ...prevState,
          shippingAddress: addr,
          shippingPostCode: data.zonecode,
        }));

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        } else {
          document.getElementById('sample6_extraAddress').value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById('sample6_detailAddress').focus();
      },
    }).open();
  }
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (id === 'myCheckbox1') {
      setSameAsMember(checked);
    } else if (id === 'myCheckbox2') {
      setSameAsMember(!checked);
      setNewAddress('');
    }
  };

  async function fetchCartData() {
    const userCartData = await pb.collection('cart').getFullList({
      filter: `user = '${authUserDataId}' && (pendingOrders = 'false' || pendingOrders = 'true')`,
      expand: 'user, product',
      requestKey: null,
    });

    return userCartData;
  }

  const {
    isLoading,
    data: cartData,
    error,
  } = useQuery(['cart'], () => fetchCartData(), {
    retry: 2,
  });

  let dataItems = cartData || [];

  console.log(dataItems);

  const [arrayDataItems, setArrayDataItems] = useState([]);

  useEffect(() => {
    if (typeof dataItems === 'object') {
      const dataArray = Object.keys(dataItems).map((key) => {
        return dataItems[key];
      });
      setArrayDataItems(dataArray);
    }
    console.log('arrayDataItems:', arrayDataItems);
  }, [arrayDataItems]);
  
  /* if (Array.isArray(dataItems) && dataItems.length > 0) {
    dataItems.forEach((item) => {
      const userId = item.user;
      console.log('item userId:', userId);
    });
  } */

  useEffect(() => {
    if (!isLoading && Array.isArray(dataItems) && dataItems.length > 0) {
      const filteredData = dataItems.filter((item) => item.userTest === 'abc');

      if (filteredData.length > 0) {
        console.log('filteredData:', filteredData);
        setSelectedCartData(filteredData);
      }
    }
  }, [isLoading, dataItems]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const fullUserData = await pb.collection('users').getFullList();

        const fullUserDataItems = fullUserData.map((item) => {
          return item;
        });

        const filetedUserDataItems = fullUserDataItems.filter(
          (item) => item.id === authUserDataId
        );
        console.log('filetedUserDataItems:', filetedUserDataItems);
        setUserDataItems(filetedUserDataItems);

        if (filetedUserDataItems && filetedUserDataItems.length > 0) {
          setSaveUserId(filetedUserDataItems.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUserData();
  });

  // const userId = 인증 user id === cart user setUserId(userid)
  // const user = 인증 유저 id === cart 콜렉션의 user  // if 문으로 False / true 확인하여 노출

  const [formState, setFormState] = useState({
    email: userDataItems[0]?.userEmail || '',
    userName: userDataItems[0]?.userName || '',
    shippingPostCode: '',
    shippingAddress: userDataItems[0]?.address || '',
    shippingAddressDetails: '',
    phoneNumberFirst: '',
    phoneNumberSecond: '',
    phoneNumberThird: '',
    landlinePhoneFirst: '',
    landlinePhoneSecond: '',
    landlinePhoneThird: '',
    deliveryMessage: '',
  });

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      email: userDataItems[0]?.userEmail || '',
      userName: userDataItems[0]?.name || '',
    }));
  }, [userDataItems]);

  const handlePaymentEvent = async (e) => {
    e.preventDefault();

    const itemsData = selectedCartData.map((item) => ({
      selectedQuantity: item?.selectedQuantity,
      selectedPrice: item?.selectedSubtotal,
      selectedTitle: item?.selectedProductTitle,
      cart: item?.id,
      user: authUserDataId,
      // product: item.expand.product.id,
      name: item?.userName,
    }));

    const createOrder = async (itemsData, formState) => {
      const selectedShippingAddress =
        formState.shippingAddress + formState.shippingAddressDetails;
      const selectedPhoneNumber =
        formState.phoneNumberFirst.toString() +
        formState.phoneNumberSecond.toString() +
        formState.phoneNumberThird.toString();
      const landlinePhoneNumber =
        formState.landlinePhoneFirst.toString() +
        formState.landlinePhoneSecond.toString() +
        formState.landlinePhoneThird.toString();
      const deliveryMessage =
        formState.deliveryMessage !== '' ? formState.deliveryMessage : '';

      const formData = {
        recipient: formState.userName,
        email: formState.email,
        shippingAddress: selectedShippingAddress,
        phoneNumber: selectedPhoneNumber,
        landlinePhone: landlinePhoneNumber,
        deliveryMessage: deliveryMessage,
      };

      try {
        for (const item of itemsData) {
          await pb.collection('orders').create({
            ...formData,
            ...item,
          });
        }
        toast.success('결제가 성공적으로 완료되었습니다', {
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        navigate('/lumieleu/mypage');
      } catch (error) {
        console.error(error);
        toast.error('결제에 실패했습니다', {
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      }
    };

    createOrder(itemsData, { ...formState })
      .then(() => console.log('All orders have been created'))
      .catch((err) => console.error(err));

    const {
      email,
      userName,
      shippingPostCode,
      shippingAddress,
      shippingAddressDetails,
      phoneNumberFirst,
      phoneNumberSecond,
      phoneNumberThird,
      landlinePhoneFirst,
      landlinePhoneSecond,
      landlinePhoneThird,
    } = formState;

    if (!validateEmail(email)) {
      return;
    }

    if (!validateShippingPostCode(shippingPostCode)) {
      return;
    }

    if (!validateShippingAddress(shippingAddress)) {
      return;
    }

    if (!validateShippingAddressDetails(shippingAddressDetails)) {
      return;
    }

    if (!validateUserName(userName)) {
      return;
    }

    if (!validatePhoneNumberFirst(phoneNumberFirst)) {
      return;
    }

    if (!validatePhoneNumberSecond(phoneNumberSecond)) {
      return;
    }

    if (!validatePhoneNumberThird(phoneNumberThird)) {
      return;
    }

    if (!validateLandlinePhoneFirst(landlinePhoneFirst)) {
      return;
    }

    if (!validateLandlinePhoneSecond(landlinePhoneSecond)) {
      return;
    }

    if (!validateLandlinePhoneThird(landlinePhoneThird)) {
      return;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormState((prevState) => ({
        ...prevState,
        email: value,
      }));
    } else if (name === 'shippingPostCode') {
      setFormState((prevState) => ({
        ...prevState,
        shippingPostCode: value,
      }));
    } else if (name === 'shippingAddress') {
      if (!sameAsMember) {
        onChangeShippingAddress(e);
      }
      setFormState((prevState) => ({
        ...prevState,
        shippingAddress: value,
      }));
    } else if (name === 'shippingAddressDetails') {
      onChangeShippingAddressDetails(e);
      setFormState((prevState) => ({
        ...prevState,
        shippingAddressDetails: value,
      }));
    } else if (name === 'userName') {
      setFormState((prevState) => ({
        ...prevState,
        userName: value,
      }));
    } else if (name === 'phoneNumberFirst') {
      setFormState((prevState) => ({
        ...prevState,
        phoneNumberFirst: value,
      }));
    } else if (name === 'phoneNumberSecond') {
      setFormState((prevState) => ({
        ...prevState,
        phoneNumberSecond: value,
      }));
    } else if (name === 'phoneNumberThird') {
      setFormState((prevState) => ({
        ...prevState,
        phoneNumberThird: value,
      }));
    } else if (name === 'landlinePhoneFirst') {
      setFormState((prevState) => ({
        ...prevState,
        landlinePhoneFirst: value,
      }));
    } else if (name === 'landlinePhoneSecond') {
      setFormState((prevState) => ({
        ...prevState,
        landlinePhoneSecond: value,
      }));
    } else if (name === 'landlinePhoneThird') {
      setFormState((prevState) => ({
        ...prevState,
        landlinePhoneThird: value,
      }));
    } else if (name === 'deliveryMessage') {
      setFormState((prevState) => ({
        ...prevState,
        deliveryMessage: value,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const validateEmail = (email) => {
    return emailReg(email);
  };

  const validateShippingPostCode = (shippingPostCode) => {
    return shippingPostCodeReg(shippingPostCode);
  };

  const validateShippingAddress = (shippingAddress) => {
    return shippingAddressReg(shippingAddress);
  };

  const validateShippingAddressDetails = (shippingAddressDetails) => {
    return shippingAddressDetailsReg(shippingAddressDetails);
  };

  const validateUserName = (userName) => {
    return userNameReg(userName);
  };

  const validatePhoneNumberFirst = (phoneNmberFirst) => {
    return phoneNumberFirstReg(phoneNmberFirst);
  };

  const validatePhoneNumberSecond = (phoneNmberSecond) => {
    return phoneNumberSecondReg(phoneNmberSecond);
  };

  const validatePhoneNumberThird = (phoneNmberThird) => {
    return phoneNumberThirdReg(phoneNmberThird);
  };

  const validateLandlinePhoneFirst = (landlinePhoneFirst) => {
    return landlinePhoneFirstReg(landlinePhoneFirst);
  };

  const validateLandlinePhoneSecond = (landlinePhoneSecond) => {
    return landlinePhoneSecondReg(landlinePhoneSecond);
  };

  const validateLandlinePhoneThird = (landlinePhoneThird) => {
    return landlinePhoneThirdReg(landlinePhoneThird);
  };

  const [emailMsg, setEmailMsg] = useState('');
  const [shippingPostCodeMsg, setShippingPostCodeMsg] = useState('');
  const [shippingAddressMsg, setShippingAddressMsg] = useState('');
  const [shippingAddressDetailsMsg, setShippingAddressDetailsMsg] =
    useState('');
  const [userNameMsg, setUserNameMsg] = useState('');
  const [phoneNumberFirstMsg, setPhoneNumberFirstMsg] = useState('');
  const [phoneNumberSecondMsg, setPhoneNumberSecondMsg] = useState('');
  const [phoneNumberThirdMsg, setPhoneNumberThirdMsg] = useState('');
  const [landlinePhoneFirstMsg, setLandlinePhoneFirstMsg] = useState('');
  const [landlinePhoneSecondMsg, setLandlinePhoneSecondMsg] = useState('');
  const [landlinePhoneThirdMsg, setLandlinePhoneThirdMsg] = useState('');

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkShippingPostCode, setCheckShippingPostCode] = useState(false);
  const [checkShippingAddress, setCheckShippingAddress] = useState(false);
  const [checkShippingAddressDetails, setCheckShippingAddressDetails] =
    useState(false);
  const [checkUserNameEmail, setCheckUserName] = useState(false);
  const [checkPhoneNumberFirst, setCheckPhoneNumberFirst] = useState(false);
  const [checkPhoneNumberSecond, setCheckPhoneNumberSecond] = useState(false);
  const [checkPhoneNumberThird, setCheckPhoneNumberThird] = useState(false);
  const [checkLandlinePhoneFrist, setCheckLandlinePhoneFirst] = useState(false);
  const [checkLandlinePhoneSeocnd, setCheckLandlinePhoneSecond] =
    useState(false);
  const [checkLandlinePhoneThird, setCheckLandlinePhoneThird] = useState(false);

  const isEmailValid = validateEmail(formState.email);

  const isShippingPostCode = validateShippingPostCode(
    formState.shippingPostCode
  );

  const isShippingAddressValid = validateShippingAddress(
    formState.shippingAddress
  );
  const isShippingAddressDetailsValid = validateShippingAddressDetails(
    formState.shippingAddressDetails
  );
  const isUserNameValid = validateUserName(formState.userName);
  const isPhoneNumberFirstValid = validatePhoneNumberFirst(
    formState.phoneNumberFirst
  );
  const isPhoneNumberSecondValid = validatePhoneNumberSecond(
    formState.phoneNumberSecond
  );
  const isPhoneNumberThirdValid = validatePhoneNumberThird(
    formState.phoneNumberThird
  );
  const isLandlinePhoneFirstValid = validateLandlinePhoneFirst(
    formState.landlinePhoneFirst
  );
  const isLandlinePhoneSecondValid = validateLandlinePhoneSecond(
    formState.landlinePhoneSecond
  );
  const isLandlinePhoneThirdValid = validateLandlinePhoneThird(
    formState.landlinePhoneThird
  );

  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;

    if (!validateEmail(currentEmail)) {
      setEmailMsg('이메일 형식이 올바르지 않습니다.');
      setCheckEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setCheckEmail(true);
    }
  }, []);

  const onChangeShippingPostCode = useCallback(async (e) => {
    const currentShippingPostCode = e.target.value;

    if (
      !validateShippingPostCode(currentShippingPostCode) ||
      currentShippingPostCode == ''
    ) {
      setShippingPostCodeMsg('우편 코드 형식이 올바르지 않습니다.');
      setCheckShippingPostCode(false);
    } else {
      setShippingPostCodeMsg('올바른 우편 코드 형식입니다.');
      setCheckShippingPostCode(true);
    }
  }, []);

  const onChangeShippingAddress = useCallback(async (e) => {
    const currentShippingAddress = e.target.value;

    if (
      !validateShippingAddress(currentShippingAddress) ||
      currentShippingAddress == ''
    ) {
      setShippingAddressMsg('주소 형식이 올바르지 않습니다.');
      setCheckShippingAddress(false);
    } else {
      setShippingAddressMsg('올바른 주소 형식입니다.');
      setCheckShippingAddress(true);
    }
  }, []);

  const onChangeShippingAddressDetails = useCallback(async (e) => {
    const currentShippingAddressDetails = e.target.value;

    if (
      !validateShippingAddressDetails(currentShippingAddressDetails) ||
      currentShippingAddressDetails == ''
    ) {
      setShippingAddressDetailsMsg('상세주소 형식이 올바르지 않습니다.');
      setCheckShippingAddressDetails(false);
    } else {
      setShippingAddressDetailsMsg('올바른 상세주소 형식입니다.');
      setCheckShippingAddressDetails(true);
    }
  }, []);

  const onChangeUserName = useCallback(async (e) => {
    const currentUserName = e.target.value;

    if (!validateUserName(currentUserName)) {
      setUserNameMsg('이름 형식이 올바르지 않습니다.');
      setCheckUserName(false);
    } else {
      setUserNameMsg('올바른 이름 형식입니다.');
      setCheckUserName(true);
    }
  }, []);

  const onChangePhoneNumberFirst = useCallback(async (e) => {
    const currentPhoneNumberFirst = e.target.value;

    if (!validatePhoneNumberFirst(currentPhoneNumberFirst)) {
      setPhoneNumberFirstMsg('지역번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberFirst(false);
    } else {
      setPhoneNumberFirstMsg('올바른 지역번호 형식입니다.');
      setCheckPhoneNumberFirst(true);
    }
  }, []);

  const onChangePhoneNumberSecond = useCallback(async (e) => {
    const currentPhoneNumberSecond = e.target.value;

    if (!validatePhoneNumberSecond(currentPhoneNumberSecond)) {
      setPhoneNumberSecondMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberSecond(false);
    } else {
      setPhoneNumberSecondMsg('올바른 일반번호 형식입니다.');
      setCheckPhoneNumberSecond(true);
    }
  }, []);

  const onChangePhoneNumberThird = useCallback(async (e) => {
    const currentPhoneNumberThird = e.target.value;

    if (!validatePhoneNumberSecond(currentPhoneNumberThird)) {
      setPhoneNumberThirdMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberThird(false);
    } else {
      setPhoneNumberThirdMsg('올바른 일반번호 형식입니다.');
      setCheckPhoneNumberThird(true);
    }
  }, []);

  const onChangeLandlinePhoneFirst = useCallback(async (e) => {
    const currentLandlinePhoneFirst = e.target.value;

    if (!validateLandlinePhoneFirst(currentLandlinePhoneFirst)) {
      setLandlinePhoneFirstMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneFirst(false);
    } else {
      setLandlinePhoneFirstMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneFirst(true);
    }
  }, []);

  const onChangeLandlinePhoneSecond = useCallback(async (e) => {
    const currentLandlinePhoneSecond = e.target.value;

    if (!validateLandlinePhoneSecond(currentLandlinePhoneSecond)) {
      setLandlinePhoneSecondMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneSecond(false);
    } else {
      setLandlinePhoneSecondMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneSecond(true);
    }
  }, []);

  const onChangeLandlinePhoneThird = useCallback(async (e) => {
    const currentLandlinePhoneThird = e.target.value;

    if (!validateLandlinePhoneThird(currentLandlinePhoneThird)) {
      setLandlinePhoneThirdMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneThird(false);
    } else {
      setLandlinePhoneThirdMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneThird(true);
    }
  }, []);

  const isValidForm =
    formState.email !== '' &&
    formState.userName !== '' &&
    formState.shippingAddress !== '' &&
    formState.shippingAddressDetails &&
    formState.phoneNumberFirst !== '' &&
    formState.phoneNumberSecond !== '' &&
    formState.phoneNumberThird !== '' &&
    formState.landlinePhoneFirst !== '' &&
    formState.landlinePhoneSecond !== '' &&
    formState.landlinePhoneThird !== '';

  if (isLoading) {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <>
      <section className={S.OrderWrapper}>
        <h2 className="sr-only">주문 페이지</h2>
        <form onSubmit={handlePaymentEvent}>
          <div className={`${S.OrderLine}`}></div>
          <span className={S.OrderOrdererInfoTitle}>주문자 정보</span>
          <div className={`${S.OrderOrdererInfoWrapper} mt-10 ml-[150px]`}>
            <span className="text-[18px] mr-[220px]">
              이메일
              <span>*</span>
            </span>
            <div>
              <input
                className={S.LargeInput}
                placeholder="인증 가능한 이메일 주소"
                name="email"
                value={userDataItems[0]?.userEmail || formState.email}
                onChange={(e) => {
                  handleInput(e);
                  onChangeEmail(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isEmailValid ? 'text-infoCorrect' : 'text-infoError'
                }`}
              >
                {emailMsg}
              </p>
            </div>
          </div>
          <div className={S.OrderLine}></div>
          <span className={S.OrderShippingAddress}>배송지 정보</span>
          <span className="text-[18px] flex mr-[48rem] mb-16 mt-10 ml-[150px]">
            배송지 선택
          </span>
          <div className="flex ml-[240px] mb-16">
            <div>
              <input
                type="text"
                className={`${S.MiddleInput} ml-[11.5rem]`}
                placeholder="우편 번호"
                name="shippingPostCode"
                id="sample6_postcode"
                value={sameAsMember ? '' : formState.shippingPostCode}
                onChange={(e) => {
                  handleInput(e);
                  onChangeShippingPostCode(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isShippingAddressValid ? 'text-infoCorrect' : 'text-infoError'
                } ml-[185px]`}
              >
                {shippingPostCodeMsg}
              </p>
            </div>
            <input
              type="button"
              className="w-[8.125rem] h-[3.125rem] ml-8 bg-black text-white rounded-md"
              onClick={sample6_execDaumPostcode}
              value="주소찾기"
            />
          </div>
          <div className="flex ml-[420px]" name="shippingAddress">
            <div className="flex justify-between mr-5 mb-16">
              <input
                type="checkbox"
                id="myCheckbox1"
                className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
                checked={sameAsMember}
                onChange={handleCheckboxChange}
              ></input>
              <label htmlFor="myCheckbox1">회원 정보와 동일</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="myCheckbox2"
                className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
                checked={!sameAsMember}
                onChange={handleCheckboxChange}
              ></input>
              <label htmlFor="myCheckbox2">새로운 배송지</label>
            </div>
          </div>
          <div className="flex mr-48 mb-16 ml-[150px]">
            <span className="text-[18px] flex self-start mr-48 mb-16">
              주소
              <span className="mr-9">*</span>
            </span>
            <div className="flex flex-col">
              {sameAsMember ? (
                <>
                  <div className="mb-16">
                    <input
                      type="text"
                      className={`${S.LargeInput}`}
                      placeholder="배송지 주소 입력칸"
                      name="shippingAddress"
                      value={
                        userDataItems[0]?.address || formState.shippingAddress
                      }
                      onChange={(e) => {
                        handleInput(e);
                        if (e.target.name === 'shippingAddress') {
                          if (sameAsMember) {
                            onChangeShippingAddress(e);
                          } else {
                            setFormState((prevState) => ({
                              ...prevState,
                              shippingAddress: e.target.value,
                            }));
                          }
                        }
                      }}
                      readOnly={!userDataItems[0]?.address}
                    ></input>
                    <p
                      className={`${S.validationFontStyle} ${
                        isShippingAddressValid
                          ? 'text-infoCorrect'
                          : 'text-infoError'
                      }`}
                    >
                      {shippingAddressMsg}
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className={S.LargeInput}
                      placeholder="배송지 상세 주소 입력칸"
                      name="shippingAddressDetails"
                      value={formState.shippingAddressDetails}
                      onChange={(e) => {
                        handleInput(e);
                        onChangeShippingAddressDetails(e);
                      }}
                    ></input>
                    <p
                      className={`${S.validationFontStyle} ${
                        isShippingAddressDetailsValid
                          ? 'text-infoCorrect'
                          : 'text-infoError'
                      }`}
                    >
                      {shippingAddressDetailsMsg}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-16">
                    <input
                      type="text"
                      className={`${S.LargeInput}`}
                      placeholder="배송지 주소 입력칸"
                      name="shippingAddress"
                      id="sample6_address"
                      value={formState.shippingAddress}
                      onChange={(e) => {
                        handleInput(e);
                        if (
                          !sameAsMember &&
                          e.target.name === 'shippingAddress'
                        ) {
                          onChangeShippingAddress(e);
                        }
                      }}
                    ></input>
                    <p
                      className={`${S.validationFontStyle} ${
                        isShippingAddressValid
                          ? 'text-infoCorrect'
                          : 'text-infoError'
                      }`}
                    >
                      {shippingAddressMsg}
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className={S.LargeInput}
                      id="sample6_detailAddress"
                      placeholder="배송지 상세 주소 입력칸"
                      name="shippingAddressDetails"
                      value={formState.shippingAddressDetails}
                      onChange={(e) => {
                        handleInput(e);
                        if (e.target.name === 'shippingAddressDetails') {
                          onChangeShippingAddressDetails(e);
                        }
                      }}
                    ></input>
                    <p
                      className={`${S.validationFontStyle} ${
                        isShippingAddressDetailsValid
                          ? 'text-infoCorrect'
                          : 'text-infoError'
                      }`}
                    >
                      {shippingAddressDetailsMsg}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex mb-16">
            <span className="text-[18px] flex self-start ml-[150px]">
              받으시는 분
            </span>
            <span className="mr-[11rem]">*</span>
            <div>
              <input
                className={S.LargeInput}
                placeholder="받으시는 분 입력칸"
                name="userName"
                value={userDataItems[0]?.name || formState.userName}
                onChange={(e) => {
                  handleInput(e);
                  onChangeUserName(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isUserNameValid ? 'text-infoCorrect' : 'text-infoError'
                }`}
              >
                {userNameMsg}
              </p>
            </div>
          </div>
          <div className="mr-40 flex mb-16 ml-[150px]">
            <span className="text-[18px] flex self-start mb-16">일반전화</span>
            <span className="mr-[12.5rem]">*</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 지역번호 입력칸"
                name="phoneNumberFirst"
                value={formState.phoneNumberFirst}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberFirst(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberFirstValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberFirstMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 두번째 입력칸"
                name="phoneNumberSecond"
                value={formState.phoneNumberSecond}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberSecond(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberSecondValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberSecondMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 세번째 입력칸"
                name="phoneNumberThird"
                value={formState.phoneNumberThird}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberThird(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberThirdValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberThirdMsg}
              </p>
            </div>
          </div>
          <div className="flex mr-40 mb-16 ml-[150px]">
            <span className="text-[18px] flex self-start mb-16">휴대전화</span>
            <span className="mr-[12.5rem]">*</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 지역번호 입력칸"
                name="landlinePhoneFirst"
                value={formState.landlinePhoneFirst}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneFirst(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneFirstValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneFirstMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 두번째 입력칸"
                name="landlinePhoneSecond"
                value={formState.landlinePhoneSecond}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneSecond(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneSecondValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneSecondMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 세번째 입력칸"
                name="landlinePhoneThird"
                value={formState.landlinePhoneThird}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneThird(e);
                }}
                type="tel"
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneThirdValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneThirdMsg}
              </p>
            </div>
          </div>
          <div className="flex mr-48 mb-16">
            <span className="text-[18px] flex self-start mb-16 mr-[12rem] ml-[150px]">
              배송메시지
            </span>
            <input
              className={S.BigInput}
              placeholder="배송메시지 입력칸"
              name="deliveryMessage"
            />
          </div>
          <div className={S.OrderLine}></div>
          <span className="mr-[50rem] ml-[150px] text-[20px] font-bold">
            결제수단
          </span>
          <div className="flex mr-52 mt-10 ">
            <span className="text-[18px] flex self-start mb-16 mr-[210px] ml-[150px]">
              결제방식
            </span>
            <button
              className={`${isValidForm ? 'text-gray900' : 'text-white'} ${
                isValidForm ? 'bg-yellow' : 'bg-gray750'
              } w-[25rem] h-[3.125rem] rounded-md`}
              title="카카오페이 결제 버튼입니다"
              type="submit"
              disabled={!isValidForm}
            >
              <span className="font-bold">카카오페이로 결제</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default OrderList;
