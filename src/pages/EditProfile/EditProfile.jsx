import pb from '@/api/pocketbase';
import Button from '@/components/Button'

function EditProfile() {
  const user = pb.authStore.model;
  console.log('dd',user.phoneNumber)

  return (
    <div className="flex-1 px-24 flex flex-col items-center justify-center">
    <h2 className="text-center text-lg font-semibold mb-16 text-[#454444] ">
      프로필 수정
    </h2>
    <form className="flex flex-col items-center gap-5 w-[25rem]">
      <div className="flex items-center justify-between">
        <label htmlFor="name">이름</label>
        <input
          name="name"
          id="name"
          type="text"
          defaultValue={user.name}
          placeholder="주소를 입력해 주세요"
          className="border w-[20rem] h-[3.125rem] pl-5"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="address">주소</label>
        <input
          name="address"
          id="address"
          type="text"
          defaultValue={user.address}
          placeholder="주소를 입력해 주세요"
          className="border w-[20rem] h-[3.125rem] pl-5"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          name="phoneNumber"
          id="phoneNumber"
          type="text"
          defaultValue={user.phoneNumber}
          placeholder="전화번호를 입력해 주세요"
          className="border w-[20rem] h-[3.125rem] pl-5"
        />
      </div>
      <Button color="white" className="w-[25rem]">수정하기</Button>
    </form>
  </div>
  )
}

export default EditProfile