import React from 'react'
import { Divider } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import CartItemList from '@components/CartItemList/CartItemList'
import CartSummary from '@components/CartSummary/CartSummary'
import { useCart, useCartMutations } from '@store/Cart'
import SwipeableEdgeDrawer from '@components/Drawer/Drawer'
import { useCreditCardContext } from '@store/CreditCardContext'

const CartPage = () => {
  const { items, subTotal } = useCart()
  const { removeFromCart } = useCartMutations()
  const { creditCardNumber } = useCreditCardContext()

  return (
    <Layout>
      <CartItemList items={items} removeFromCart={removeFromCart} />
      <Divider />
      <CartSummary totalAmount={subTotal} />
      {creditCardNumber && <SwipeableEdgeDrawer />}
    </Layout>
  )
}

export default CartPage
