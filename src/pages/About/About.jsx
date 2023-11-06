import about from '../../../public/imgs/about.svg';

export default function About() {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="flex gap-7 items-end mb-1">
        <div className="font-normal flex flex-col justify-end">
          <h2 className="text-4xl my-3">일상 속 색을 담다</h2>
          <h3 className="text-xl font-extralight mb-5">
            capture everyday colors
          </h3>
          <p className="w-[430px]">
            LUMIÉRE DE LAUBE (르미아 더 오브)는 포스터를 판매하는 곳이지만,
            우리의 목표는 단순히 제품을 판매하는 것을 넘어서서 고객들에게
            전시장에서 작품을 감상하듯 한 특별한 경험을 선사하는 것입니다.{' '}
            <br />
            <br />
            오직 포스터를 구매하는 과정만을 위한 공간이 아닌, 여러분을 위한
            창작과 예술의 세계를 펼쳐드리고자 합니다. 우리의 전용 전시실에서는
            선별된 주제와 스타일에 따라 아티스트의 작품을 전시하며, 창작 배경과
            이야기를 소개합니다. 단순한 온라인 상점을 넘어서서 예술과 문화를
            사랑하는 모든 분에게 특별한 경험을 제공하고자 합니다. 우리와 함께
            포스터의 매력적인 세계를 탐험하며, 감각적인 감동과 영감을 함께 나눌
            수 있는 공간이 되길 바랍니다.
          </p>
        </div>
        <img src={about} alt="일상 속 색을 담다" className="w-[800px]" />
      </section>
    </main>
  );
}
