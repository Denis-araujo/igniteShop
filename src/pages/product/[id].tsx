import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useContext, useState } from "react";
import Stripe from "stripe";
import { ProductsContext } from "../../context/ProductsContext";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { stripe } from "../../lib/stripe";

import * as S from "../../styles/pages/product"
import { NextPageWithLayout } from "../_app";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    priceFormat: string;
    defaultPriceId: string
  }
}

const Product:NextPageWithLayout = ({ product }: ProductProps) => {
  const { addProductCart } = useContext(ProductsContext)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </S.ImageContainer>

      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.priceFormat}</span>

        <p>{product.description}</p>

        <button onClick={() => addProductCart(product)}>
          Comprar agora
        </button>
      </S.ProductDetails>
    </S.ProductContainer>
    </>
    
  )
}

export const getStaticPaths: GetStaticPaths = async => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [
      { params: {id: 'prod_N4ejovr4sYe9gI'} }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        priceFormat: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        price: price.unit_amount
      }
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Product