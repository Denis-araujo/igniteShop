import axios from "axios";
import { createContext, ReactNode, useState } from "react";

export interface Products {
  id: string;
  name: string;
  imageUrl: string;
  priceFormat: string;
  price: number;
  defaultPriceId: string;
}

interface ProductsContextType {
  products: Products[]
  addProductCart: (product: Products) => void
  priceTotal: {
    total: number;
  },
  handleBuyProduct: () => Promise<void>
}

export const ProductsContext = createContext({} as ProductsContextType)

interface ProductsContextProviderProps {
  children: ReactNode
}

export const ProductsContextProvider = ({children}: ProductsContextProviderProps) => {

  const [products, setProducts] = useState<Products[]>([])

  function addProductCart(product: Products) {
    setProducts([...products, product])
  }

  const priceTotal = products.reduce((acc, product) => {
    acc.total = Number(product.price / 100) + acc.total

    return acc
  }, {
    total: 0,
  })

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
  
  return (
    <ProductsContext.Provider value={{ products, addProductCart, priceTotal, handleBuyProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}