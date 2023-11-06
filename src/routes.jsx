import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootLayout = lazy(() => import('@/layout/RootLayout/RootLayout'));
const Home = lazy(() => import('@/pages/Home/Home'));
const Cart = lazy(() => import('@/pages/Cart/Cart'));
const Order = lazy(() => import('@/pages/Order/Order'));
const LogIn = lazy(() => import('@/pages/LogIn/LogIn'));
const SignUp = lazy(() => import('@/pages/SignUp/SignUp'));
const ProductDetails = lazy(() =>
  import('@/pages/ProductDetails/ProductDetails')
);
const Gallery = lazy(() => import('@/pages/Gallery/GalleryPage'));
const About = lazy(() => import('@/pages/About/About'));
const MyPage = lazy(() => import('@/pages/MyPage/MyPage'));
const EditProfile = lazy(() => import('@/pages/EditProfile/EditProfile'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order" element={<Order />} />
      <Route path="login" element={<LogIn />} />
      <Route path="productdetails/:productId" element={<ProductDetails />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="productdetails" element={<ProductDetails />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="about" element={<About />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="editprofile" element={<EditProfile />} />
    </Route>
  )
);

export default router;
