import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import * as S from "../styles/pages/success";

import LayoutSuccess from "../Layouts/LayoutSuccess"
import { ReactElement, ReactNode } from "react";
import { NextPageWithLayout } from "./_app";

interface ProductProps {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  customerName: string;
  products: Array<ProductProps>
}

const Success: NextPageWithLayout = ({ customerName, products }: SuccessProps) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <S.SuccessContainer>
        <S.ImageContainer>
          {products.map((product) => {
            return (
              <Image
                key={product.name}
                src={product.imageUrl}
                width={120} 
                height={110}
                alt=""
              />
            )
          })}
        </S.ImageContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </S.SuccessContainer>
    </>
    
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })


  const customerName = session.customer_details.name;

  const lineItems = []

  session.line_items.data.map(({ price }: any) => {
    lineItems.push({
      name: price.product.name,
      imageUrl: price.product.images[0]
    })
  })
  
  return {
    props: {
      customerName,
      products: lineItems,
    }
  }
}

Success.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutSuccess>
      {page}
    </LayoutSuccess>
  )
}

export default Success