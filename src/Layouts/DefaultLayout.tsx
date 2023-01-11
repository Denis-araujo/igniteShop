import logoImg from '../assets/logo.svg'
import * as S from '../styles/pages/Layouts/DefaultLayout'
import Image from 'next/image'
import { ReactNode, useContext, useState } from 'react'
import { Handbag, X } from 'phosphor-react'

import { ProductsContext } from '../context/ProductsContext'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({children}: DefaultLayoutProps) {

  const { products, priceTotal, handleBuyProduct } = useContext(ProductsContext)
  const [isOpenCart, setIsOpenCart] = useState(false)

  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg} alt="" />

        <S.Cart onClick={() => setIsOpenCart((prevValue) => !prevValue)} >
          <Handbag size={32} weight="thin" />
        </S.Cart>
      </S.Header>

      {isOpenCart && (
          <S.ShoppingBag>
            <X size={20} onClick={() => setIsOpenCart((prevValue) => !prevValue)} />
            <p>Sacola de Compras</p>

            <S.ListProducts>
              {products?.map((product) => {
                return ( 
                  <S.Product key={product.id}>
                    <Image src={product.imageUrl} width={101} height={93} alt="" />

                    <div>
                      <span>{product.name}</span>
                      <strong>{product.priceFormat}</strong>
                      <button>Remover</button>
                    </div>
                  </S.Product>
                )
              })}
            </S.ListProducts>

            <S.ShoppingBagFooter>
              <div>
                <span>Quantidade</span>
                <span>{products.length} item(s)</span>
              </div>
              <div>
                <strong>Valor Total</strong>
                <strong>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(priceTotal.total)}
                </strong>
              </div>

              <button onClick={handleBuyProduct}>
                Finalizar Comprar
              </button>
            </S.ShoppingBagFooter>
          </S.ShoppingBag>
        )}

      {children}
    </S.Container>
  )
}