import React, { useState } from 'react';
import { Segment, Button, Portal, Header, Transition } from 'semantic-ui-react';
import { useCreditCardContext } from '@store/CreditCardContext';
import ModalCreditCard from '@components/ModalCreditCard/ModalCreditCard';

type CartSummaryProps = {
  totalAmount: number;
};

const CartSummary = ({ totalAmount }: CartSummaryProps) => {
  const { creditCardNumber,handleModalOpen, handlePortalClose, portalOpen } = useCreditCardContext()


  return (
    <Segment clearing size="large" as="section">
      <span>
        <strong>Sub total:</strong>
        {` ${totalAmount}`}
      </span>
      <Button color="black" floated="right" onClick={handleModalOpen}>
        Pay with credit card
      </Button>
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
    </Segment>
  );
};

export default CartSummary;
