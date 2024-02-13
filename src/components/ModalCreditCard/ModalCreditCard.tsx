import React, { useState } from 'react';
import { Segment, Button, Modal, Form, Message, Portal, Header } from 'semantic-ui-react';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { number, expirationDate, cvv } from 'card-validator';
import { useCreditCardContext } from '@store/CreditCardContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const ModalCreditCard = () => {
    const {
        setCreditCardNumber,
        creditCardNumber,
        setCardData,
        cardData,
        cleanState,
        formErrors,
        handleModalClose,
        handleModalOpen,
        modalOpen,
        setFormErrors,
        handlePortalOpen,

    } = useCreditCardContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'number' && value.length > 16) {
            return;
        }

        if (name === 'cvc' && value.length > 3) {
            return;
        }

        setCardData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFocusChange = (e: any) => {
        setCardData((prevData) => ({ ...prevData, focus: e.target.name }));
    };

    const validateCardInfo = () => {
        const cardNumberValidation = cardData.number;
        const expiryDateValidation = expirationDate(cardData.expiry);
        const cvvValidation = cvv(cardData.cvc);
        const errors: any = {};

        if (cardNumberValidation.length !== 16) {
            errors.number = 'Invalid card number';
        }

        if (cardNumberValidation.length === 0 || !/^\d+$/.test(cardNumberValidation)) {
            errors.number = 'Please insert number';
        }

        if (!expiryDateValidation.isValid) {
            errors.expiry = 'Invalid expiry date';
        }

        if (!cvvValidation.isValid) {
            errors.cvc = 'Invalid CVV';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handlePayWithCreditCard = () => {
        const isValid = validateCardInfo();

        if (isValid) {
            handleModalClose();
        }

        if (creditCardNumber != null) {
            return handlePortalOpen();
        }
        setCreditCardNumber({ name: cardData.name, number: cardData.number.slice(11, 15) })

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Credit card has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    };

    return (
        <Modal open={modalOpen} onClose={handleModalClose} size="tiny">
            <Modal.Header>Enter Credit Card Information</Modal.Header>
            <Modal.Content>
                <Form>
                    <Cards
                        cvc={cardData.cvc}
                        expiry={cardData.expiry}
                        focused={cardData.focus as Focused}
                        name={cardData.name}
                        number={cardData.number}
                        acceptedCards={cardData.acceptedCards}
                    />
                    <Form.Input
                        label="Card Number"
                        name="number"
                        placeholder="Enter card number"
                        onChange={handleInputChange}
                        onFocus={handleFocusChange}
                        error={formErrors.number}
                    />
                    <Form.Input
                        label="Cardholder Name"
                        name="name"
                        placeholder="Enter cardholder name"
                        onChange={handleInputChange}
                        onFocus={handleFocusChange}
                        error={formErrors.name}
                    />
                    <Form.Group widths="equal">
                        <Form.Input
                            label="Expiry Date"
                            name="expiry"
                            placeholder="MM/YY"
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                            error={formErrors.expiry}
                        />
                        <Form.Input
                            label="CVC"
                            name="cvc"
                            placeholder="CVC"
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                            error={formErrors.cvc}
                        />
                    </Form.Group>
                </Form>
                {Object.keys(formErrors).length > 0 && (
                    <Message negative>
                        <Message.Header>Please fix the errors in the form.</Message.Header>
                        <Message.List>
                            {Object.values(formErrors).map((error: any, index) => (
                                <Message.Item key={index}>{error}</Message.Item>
                            ))}
                        </Message.List>
                    </Message>
                )}
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button primary onClick={handlePayWithCreditCard}>
                    Pay
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalCreditCard