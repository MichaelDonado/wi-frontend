import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import '../global.css'

import CartProvider from '@store/Cart'
import { CreditCardContextProvider } from '@store/CreditCardContext'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <CartProvider>
      <CreditCardContextProvider>
        <Component {...pageProps} />
      </CreditCardContextProvider>
    </CartProvider>
  )
}

export default MyApp
