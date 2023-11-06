import pb from '@/api/pocketbase';
import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware';

const USER_COLLECECTION = 'users';

const initalAuthState = {
  isAuth: false,
  user: null,
  token: '',
};

const authStore = (set) => ({
  ...initalAuthState,

  /* Pb SDK를 사용한 회원가입 */
  signUp: async (registerUser) => {
    return await pb.collection(USER_COLLECECTION).create(registerUser);
  },

  /* Pb SDK를 사용한 로그인 */
  logIn: async (username, password) => {
    const authData = await pb
      .collection(USER_COLLECECTION)
      .authWithPassword(username, password);

    const { isValid, model, token } = pb.authStore;

    set(
      (state) => ({
        ...state,
        isAuth: isValid,
        user: model,
        token,
      }),
      false,
      'auth/login'
    );

    return authData;
  },

  /* Pb SDK를 사용한 로그아웃 */
  signOut: async () => {
    const response = await pb.authStore.clear();
    set(
      (state) => ({
        ...state,
        ...initalAuthState,
      }),
      false,
      'auth/signout'
    );

    return response;
  },

  /* Pb SDK를 사용한 회원탈퇴 */
  Withdrawal: async (recordId) => {
    const response = await pb.collection(USER_COLLECECTION).delete(recordId);

    set(
      (state) => ({
        ...state,
        ...initalAuthState,
      }),
      false,
      'auth/withDrawal'
    );

    return response;
  },

  /* Pb SDK를 사용한 카카오톡으로 로그인 */
  SignWithKaKao: async () => {
    // Kakao 계정으로 인증 정보를 가져옴
    const kakaoAuth = await pb
      .collection(USER_COLLECECTION)
      .authWithOAuth2({ provider: 'kakao' });

    // Kakao 인증 정보에서 필요한 정보 추출

    const { username: name, email, token } = kakaoAuth.meta;

    // 사용자 정보 업데이트 객체 생성
    const updateUser = {
      name,
      // 이메일에서 @ 이전의 부분을 사용자명으로 설정
      username: email.split('@')[0],
    };

    // Zustand의 set 함수를 사용하여 상태 업데이트
    set((state) => ({
      ...state,
      // 로그인 상태로 변경
      isAuth: true,
      // 사용자 정보 업데이트
      user: updateUser,
      // 토큰 업데이트
      token,
    }));

    // Firestore에서 사용자 데이터 업데이트
    await pb
      .collection(USER_COLLECECTION)
      .update(kakaoAuth.record.id, updateUser);

    // Kakao 인증 객체 반환
    return kakaoAuth;
  },
});
const useAuthStore = create(persist(devtools(authStore), { name: 'auth' }));

export default useAuthStore;
