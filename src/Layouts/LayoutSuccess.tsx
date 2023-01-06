import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/Layouts/LayoutSuccess'
import Image from 'next/image'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function LayoutSuccess({children}: DefaultLayoutProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      {children}
    </Container>
  )
}