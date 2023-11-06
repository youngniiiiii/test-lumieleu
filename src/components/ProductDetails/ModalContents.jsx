// 교환 및 환불
export function ExchangeRefundInfo() {
  return (
    <>
      <ul className="list-disc mx-4 flex flex-col gap-2">
        <h3 className="font-bold mb-3">교환/반품이 가능한 경우</h3>
        <li>
          단순 변심, 착오 구매에 따른 교환/반품은 상품을 공급받은 날부터 7일
          이내에 가능합니다. (배송비 고객 부담)
        </li>
        <li>
          단, 일부 제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가
          상실된 경우에는 교환 및 반품이 불가능합니다. (상품 확인을 위하여 포장
          훼손한 경우는 제외)
        </li>
        <li>
          공급 받으신 상품 내용이 표시, 광고내용과 다르거나 다르게 이행된
          경우에는 그 상품을 공급받은 날부터 3개월 이내, 그 사실을 안 날 또는 알
          수 있었던 날부터 30일 이내 청약철회가 가능합니다. (배송비 회사 부담)
        </li>
        <li>
          교환 및 반품 신청에는 사유에 따라 배송비 3,000~6,000원이 부과됩니다.
          이 때 무료배송 혜택을 받은 주문일 경우 왕복 금액을, 배송비를 부담하신
          경우 편도 금액을 산정하여 환불 금액에서 차감될 수 있습니다.
        </li>
        <li>
          물품 하자에 의한 반송을 제외하고 고객변심에 의한 반품, 교환인 경우
          배송비는 고객 부담이며(교환 시 6,000원 / 반품 시 3,000원), 접수
          완료일로부터 평일 기준 2~3일 내에 수거가 이루어집니다.
        </li>
        <li>
          구매수량 단위로 배송비가 부과된 상품은 교환 및 반품을 희망하실 경우
          주문시와 동일하게 구매수량 단위로 회수비를 부과합니다.
        </li>
        <li>
          반품 시, 상품대금 환불은 상품 회수 및 청약철회가 확정된 날로부터
          3영업일 이내 진행되며, 기한을 초과한 경우 지연 기간에 대하여
          「전자상거래 등에서의 소비자보호에 관한 법률 시행령」 에서 정하는
          이율을 곱하여 산정한 지연이자를 지급합니다.
        </li>
        <li>
          주문취소 및 교환/반품은 [마이페이지 &gt; 주문/배송조회] 또는
          고객센터를 통해 신청하실 수 있습니다.
        </li>
      </ul>
      <ul className="list-disc mx-4 flex flex-col gap-2">
        <h3 className="font-bold my-3">교환/반품이 불가능한 경우</h3>
        <li>
          비자에게 책임이 있는 사유로 재화등이 멸실되거나 훼손된 경우(재화의
          내용을 확인하기 위하여 포장을 훼손한 경우는 제외)
        </li>
        <li>
          소비자의 사용 또는 일부 소비로 재화등의 가치가 현저히 감소한 경우
        </li>
        <li>
          시간이 지나 다시 판매하기 곤란할 정도로 재화등의 가치가 현저히 감소한
          경우
        </li>
        <li>복제가 가능한 재화등의 포장을 훼손한 경우</li>
        <li>
          소비자의 주문에 따라 개별적으로 생산되는 재화등 또는 이와 유사한
          재화등에 대하여 청약철회등을 인정하는 경우 통신판매업자에게 회복할 수
          없는 중대한 피해가 예상되는 경우로서 사전에 해당 거래에 대하여 별도로
          그 사실을 고지하고 소비자의 서면(전자문서 포함)에 의한 동의를 받은
          경우
        </li>
      </ul>
    </>
  );
}

// 주문 및 배송
export function OrderDeliveryInfo() {
  return (
    <>
      <dl>
        <dt className="font-bold my-3">배송지역</dt>
        <dd>
          전국 가능 (군부대 일부 지역은 제외), 제주도 및 도서산간 추가 비용 없음
        </dd>
        <dt className="font-bold my-3">배송기간</dt>
        <dd>
          입금 확인 후 2~4일 가량 소요되며, 지역별 택배업체 사정에 따라 약간의
          차이가 있을 수 있습니다. 연휴/공휴일 포함 주문 또는 일부
          도서지역/사서함 배송 주문은 2~3일 가량 추가 소요될 수 있습니다.
        </dd>
        <dt className="font-bold my-3">배송비</dt>
        <dd>할인 적용 후 최종 결제금액 15,000원 이상 구매시 무료배송</dd>
        <dd>
          합산금액 15,000원 미만 주문시 배송비가 부과됩니다. (도서산간 지역
          추가비용 없음)
        </dd>
        <dd>일부 상품의 경우, 구매수량 단위로 배송비가 부과될 수 있습니다.</dd>
      </dl>
    </>
  );
}
