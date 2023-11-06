import { useState } from 'react';
import Modal from './Modal'; // 실제 Modal 컴포넌트 경로로 수정해주세요.
import { ExchangeRefundInfo, OrderDeliveryInfo } from './ModalContents'; // 실제 컴포넌트 경로로 수정해주세요.

const OrderExchange = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="flex gap-11 justify-center mt-10">
      <button onClick={() => openModal('exchange')}>교환 및 환불</button>
      <button onClick={() => openModal('order')}>주문 및 배송</button>

      <Modal isOpen={modalType !== null} closeModal={closeModal}>
        {modalType === 'exchange' && <ExchangeRefundInfo />}
        {modalType === 'order' && <OrderDeliveryInfo />}
      </Modal>
    </div>
  );
};

export default OrderExchange;
