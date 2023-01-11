import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from 'next/link'
import type { NextPageWithLayout } from './_app'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import Stripe from "stripe"

import * as S from "../styles/pages/home"

import { Handbag } from "phosphor-react"

import 'keen-slider/keen-slider.min.css'
import { ReactElement, useContext } from "react"
import DefaultLayout from "../Layouts/DefaultLayout"
import { Products, ProductsContext } from "../context/ProductsContext"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    priceFormat: string;
    price: number;
    defaultPriceId: string;
  }[]
}

const Home:NextPageWithLayout = ({ products }: HomeProps) => {
  const { addProductCart } = useContext(ProductsContext)

  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddProductCart(product: Products){
    addProductCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <S.Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`}  prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormat}</span>
                </div>

                <button onClick={() => handleAddProductCart(product)}>
                  <Handbag size={32} weight="thin" />
                </button>
              </footer>
            </S.Product>
          )
        })}
      </S.HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {

  const price = product.default_price as Stripe.Price

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    priceFormat: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount! / 100),
    price: Number(price.unit_amount),
    defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home