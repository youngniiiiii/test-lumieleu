import pb from '@/api/pocketbase';
import { createContext } from 'react';
import { useContext } from 'react';
import { create } from 'zustand';

const initalAuthState = {
  isAuth: false,
  user: null,
  token: '',
};

const useAuthStore = create((set) => ({
  ...initalAuthState,

  /* Pb SDK를 사용한 회원가입 */
  signUp: async (registerUser) => {
    try {
      const user = await pb.collection('users').create(registerUser);
      set({ isAuth: true, user, token: user.token });
    } catch (error) {
      console.error(error);
      throw new Error('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
    }
  },

  // signUp: async (registerUser) => {
  //   return await pb.collection('users').create(registerUser);
  // },

  /* Pb SDK를 사용한 로그인 */
  LogIn: async (userNameOrEmail, password) => {
    try {
      const user = await pb
        .collection('users')
        .authWithPassword(userNameOrEmail, password);
      set({ isAuth: true, user, token: user.token }); //
    } catch (error) {
      console.error(error);
      throw new Error('아이디나 비밀번호를 확인해주세요.');
    }
  },

  // LogIn: async (userNameOrEmail, password) => {
  //   return await pb
  //     .collection('users')
  //     .authWithPassword(userNameOrEmail, password);
  // },

  /* Pb SDK를 사용한 로그아웃 */
  signOut: async () => {
    try {
      await pb.authStore.clear();
      set({ isAuth: false, user: null, token: null });
    } catch (error) {
      console.error(error);
      throw new Error('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  },
  // signOut: async () => {
  //   return await pb.authStore.clear();
  // },

  /* Pb SDK를 사용한 회원탈퇴 */
  Withdrawal: async (recordId) => {
    try {
      await pb.collection('users').delete(recordId);
      set({ isAuth: false, user: null, token: null });
    } catch (error) {
      console.error(error);
      throw new Error('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  },
  // Withdrawal: async (recordId) => {
  //   return await pb.collection('users').delete(recordId);
  // },
}));

export default useAuthStore;

const AuthContext = createContext();

export const useAuth = () => {
  const authValue = useContext(AuthContext);
  if (!authValue) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용할 수 있습니다.');
  }

  return authValue;
};
