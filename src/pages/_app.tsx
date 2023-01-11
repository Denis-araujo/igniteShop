import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { ProductsContextProvider } from '../context/ProductsContext'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

globalStyles()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ProductsContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </ProductsContextProvider>
  )
}
