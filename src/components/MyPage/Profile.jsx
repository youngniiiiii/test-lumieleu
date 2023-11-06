import pb from '@/api/pocketbase';
import MyPageButton from './MyPageButton';

function Profile() {
  const user = pb.authStore.model;

  return (
    <section className="flex justify-between border border-black rounded px-8 py-4 mx-auto max-w-3xl">
      <h2 className="hidden">나의 정보</h2>
      <div className="flex gap-4 items-center">
        <img src="/public/profile.svg" alt="프로필" />
        <div>
          <p><strong>{user.name}</strong>님 안녕하세요!</p>
          <MyPageButton text="프로필 수정"/>      
        </div>
      </div>
      <div className="flex border-l border-black gap-6 pl-10">
        <div className="flex flex-col gap-1 items-center">
          <img src="/public/order.svg" alt="주문" />
          <p>총 <strong>10</strong>건 주문</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <img src="/public/like.svg" alt="좋아요" />
          <p><strong>5</strong>개 좋아요</p>
        </div>
      </div>
    </section>
  )
}

export default Profile