import { useRouter } from "next/router";

import * as S from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <S.ProductContainer>
      <S.ImageContainer>

      </S.ImageContainer>


      <S.ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa eius quis in, assumenda aliquid sit soluta modi architecto saepe consequuntur nostrum et odit adipisci fuga dignissimos mollitia non perferendis. Totam.</p>

        <button>
          Comprar agora
        </button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}