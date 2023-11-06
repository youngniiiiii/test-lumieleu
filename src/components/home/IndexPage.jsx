import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import S from './IndexPage.module.css';

function IndexPage() {
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      setIsMouseMoving(true);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 3000); // 마우스 움직임이 없으면 다시 아래로 내려감
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  useEffect(() => {
    // 스크롤 금지 설정
    document.body.style.overflow = 'hidden';
    return () => {
      // 컴포넌트 unmount 시 스크롤 설정 해제
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section className="relative w-screen h-screen">
      <video
        className="w-screen h-screen"
        autoPlay
        loop
        muted
        style={{ objectFit: 'cover' }}
      >
        <source src="/videos/main_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <p className="font-serif text-4xl text-center text-white">
          lumière <br /> de l&#39;aube
        </p>
      </div>
      <div className={`${S.goGallery} ${isMouseMoving ? S.moveUp : ''}`}>
        <Link
          to="/gallery"
          className="px-4 py-1 font-serif text-xl rounded-full border-[1px]"
        >
          작품 보러가기
        </Link>
      </div>
    </section>
  );
}

export default IndexPage;
