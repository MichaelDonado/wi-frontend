import CartItemList from '@components/CartItemList/CartItemList'
import CartSummary from '@components/CartSummary/CartSummary'
import { CartItemType, useCart, useCartMutations } from '@store/Cart'
import { useCreditCardContext } from '@store/CreditCardContext'
import Link from 'next/link'
import React from 'react'
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Icon,
    Image,
    Modal,
    Divider,
    Segment,
    Item,
} from 'semantic-ui-react'

const ModalTransaction = ({ showTransaction, setShowTransaction }: any) => {
    const { items, subTotal } = useCart()
    const { removeFromCart } = useCartMutations()
    const { creditCardNumber } = useCreditCardContext()
    const mapCartItemsToItems = (items: CartItemType[]) =>
        items.map((cartItem) => {
            const { id, name, quantity, price, image } = cartItem

            return {
                childKey: id,
                header: (
                    <Link legacyBehavior href="/product/[id]" as={`/product/${id}/`} passHref>
                        <Item.Header as="a">{name}</Item.Header>
                    </Link>
                ),
                image: (
                    <Item.Image
                        src={image}
                        alt={name}
                        size="small"
                        style={{ background: '#f2f2f2' }}
                    />
                ),
                meta: `${quantity} x ${price}`,
                description: 'Some more information goes here....',
            }
        })

    return (
        <Modal
            open={showTransaction}
            onClose={() => setShowTransaction(false)}
            onOpen={() => setShowTransaction(true)}
        >
            <ModalHeader>Transaction</ModalHeader>
            <ModalContent scrolling>
                <ModalDescription>
                    <Item.Group divided items={mapCartItemsToItems(items)} as="section" />
                    <Divider />
                    <Segment clearing size="large" as="section"><strong>Total:</strong> {subTotal}</Segment>
                    <Segment clearing size="large" as="section"><strong>Payment by:</strong> {`${creditCardNumber?.name || ''}`}</Segment>
                    <Segment clearing size="large" as="section"><strong>Credit card:</strong> {`****${creditCardNumber?.number || ''}`}</Segment>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
            <Link legacyBehavior href="/" passHref>
                <Button onClick={() => setShowTransaction(false)} primary>
                    Ok <Icon name='chevron right' />
                </Button>
            </Link>
            </ModalActions>
        </Modal>
    )
}

export default ModalTransaction