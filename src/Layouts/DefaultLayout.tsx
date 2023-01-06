import logoImg from '../assets/logo.svg'
import * as S from '../styles/pages/Layouts/DefaultLayout'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Handbag, X } from 'phosphor-react'

import camiseta1 from '../assets/camisetas/1.png'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({children}: DefaultLayoutProps) {

  const [open, setOpen] = useState(false)

  console.log(open)

  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg} alt="" />

        <S.Cart onClick={() => setOpen((prevValue) => !prevValue)} >
          <Handbag size={32} weight="thin" />
        </S.Cart>

        {open && (
          <S.ShoppingBag>
            <X size={20} onClick={() => setOpen((prevValue) => !prevValue)} />
            <p>Sacola de Compras</p>

            <S.ListProducts>
              <S.Product>
                <Image src={camiseta1} width={101} height={93} alt="" />

                <div>
                  <span>Camiseta Beyond the Limits</span>
                  <strong>R$ 79, 90</strong>
                  <button>Remover</button>
                </div>
              </S.Product>

              <S.Product>
                <Image src={camiseta1} width={101} height={93} alt="" />

                <div>
                  <span>Camiseta Beyond the Limits</span>
                  <strong>R$ 79, 90</strong>
                  <button>Remover</button>
                </div>
              </S.Product>

              <S.Product>
                <Image src={camiseta1} width={101} height={93} alt="" />

                <div>
                  <span>Camiseta Beyond the Limits</span>
                  <strong>R$ 79, 90</strong>
                  <button>Remover</button>
                </div>
              </S.Product>
            </S.ListProducts>

            <S.ShoppingBagFooter>
              <div>
                <span>Quantidade</span>
                <span>3 items</span>
              </div>
              <div>
                <strong>Valor Total</strong>
                <strong>R$ 270,00</strong>
              </div>

              <button>
                Finalizar Comprar
              </button>
            </S.ShoppingBagFooter>
          </S.ShoppingBag>
        )}
      </S.Header>

      {children}
    </S.Container>
  )
}