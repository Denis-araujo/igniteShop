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
  priceTotal: {
    total: number;
  },
  addProductCart: (product: Products) => void
  removeProductCart: (product: Products) => void
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

  function removeProductCart(product: Products){
    const filteredProducts = products.filter((products) => products.id !== product.id)

    setProducts(filteredProducts)
  }

  const priceTotal = products.reduce((acc, product) => {
    acc.total = Number(product.price / 100) + acc.total

    return acc
  }, {
    total: 0,
  })

  return (
    <ProductsContext.Provider value={{ products, addProductCart, priceTotal, removeProductCart }}>
      {children}
    </ProductsContext.Provider>
  )
}