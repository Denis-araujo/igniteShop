import logoImg from '../assets/logo.svg'
import * as S from '../styles/pages/Layouts/DefaultLayout'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Cart } from '../components/Cart'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({children}: DefaultLayoutProps) {
  const [isOpenCart, setIsOpenCart] = useState(false)

  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg} alt="" />

        <Cart isOpen={isOpenCart} />
      </S.Header>

      {children}
    </S.Container>
  )
}