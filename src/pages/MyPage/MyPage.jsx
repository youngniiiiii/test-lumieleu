import Profile from "@/components/MyPage/Profile"
import OrderedProductList from './../../components/MyPage/OrderedProductList';

function MyPage() {
  return (
    <div className="py-[66px]">
      <Profile/>
      <section className="flex flex-col gap-3 mx-auto max-w-3xl mt-6">
        <h2 className="text-lg font-semibold">주문 내역</h2>
        <OrderedProductList/>
      </section>
      
    </div>
  )
}

export default MyPage