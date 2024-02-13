import React, { useState } from 'react';
import { Segment, Button, Portal, Header, Transition } from 'semantic-ui-react';
import { useCreditCardContext } from '@store/CreditCardContext';
import ModalCreditCard from '@components/ModalCreditCard/ModalCreditCard';
import SwipeableEdgeDrawer from '@components/Drawer/Drawer';
import ModalTransaction from '@components/ModalTransaction/ModalTransaction';

type CartSummaryProps = {
  totalAmount: number;
};

const CartSummary = ({ totalAmount }: CartSummaryProps) => {
  const { creditCardNumber, handleModalOpen, handlePortalClose, portalOpen, setShowSummary} = useCreditCardContext()
  const [showTransaction, setShowTransaction] = useState(false);

  const goToTransaction = () => {
    setShowSummary(false);
    setShowTransaction(true)
  }

  return (
    <Segment clearing size="large" as="section">
      <span>
        <strong>Total:</strong>
        {` ${totalAmount}`}
      </span>
      {creditCardNumber ? (
        <Button color="black" floated="right" onClick={goToTransaction}>
          Purcharse
        </Button>
      ) : (
        <Button color="black" floated="right" onClick={handleModalOpen}>
          Pay with credit card
        </Button>
      )}
      <ModalCreditCard />
      <Portal onClose={handlePortalClose} open={portalOpen}>
        <Segment
          style={{
            left: '40%',
            position: 'fixed',
            top: '50%',
            zIndex: 1000,
          }}
        >
          <Header>The credit card is already registered</Header>
          <p>Please go to checkout.</p>
          <Button
            content='Close'
            negative
            onClick={handlePortalClose}
          />
        </Segment>
      </Portal>
      <ModalTransaction showTransaction={showTransaction} setShowTransaction={setShowTransaction} />
    </Segment>
  );
};

export default CartSummary;
