import axios from "axios"
import Image from "next/image"
import { Handbag, X } from "phosphor-react"
import { useContext, useState } from "react"
import { Products, ProductsContext } from "../../context/ProductsContext"
import * as S from "./styles"

interface CartProps {
  isOpen: boolean
}

export function Cart({ isOpen }: CartProps) {

  const [isOpenCart, setIsOpenCart] = useState(isOpen)

  const { products, priceTotal, removeProductCart } = useContext(ProductsContext)

  async function handleBuyProduct() {
    try {
      const response = await axios.post('/api/checkout', {
        products: 
          products
        ,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datadog /  Sentry)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  function handleRemoveProduct(product: Products) {
    removeProductCart(product)
  }

  return (
    <>
      <S.Cart 
        onClick={() => setIsOpenCart((prevValue) => !prevValue)}
      >
        <Handbag size={32} weight="thin" />
      </S.Cart>

      {isOpenCart && (
        <S.ShoppingBag>
          <X 
            size={20} 
            onClick={() => setIsOpenCart((prevValue) => !prevValue)}
          />
          <p>Sacola de Compras</p>

          <S.ListProducts>
            <>
              {products.length === 0 ? (
                <p>Você ainda não escolheu nenhuma camiseta</p>
              ) : 
                products?.map((product) => {
                  return ( 
                    <S.Product key={product.id}>
                      <Image 
                        src={product.imageUrl} 
                        width={101} 
                        height={93} 
                        alt=""
                      />

                      <div>
                        <span>{product.name}</span>
                        <strong>{product.priceFormat}</strong>
                        <button onClick={() => handleRemoveProduct(product)}>Remover</button>
                      </div>
                    </S.Product>
                  )
              })}

              
            </>

            
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
    </>
  )
}