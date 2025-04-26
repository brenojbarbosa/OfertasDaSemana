
import { createContext, useContext, useState, ReactNode } from 'react'

export type Oferta = {
  id: number
  nome: string
  preco: number
  categoria: string
  imagem: string
  descricao: string
}

type OfertasContextType = {
  ofertas: Oferta[]
  adicionarOferta: (oferta: Oferta) => void
}

const OfertasContext = createContext<OfertasContextType | undefined>(undefined)

export const OfertasProvider = ({ children }: { children: ReactNode }) => {
  const [ofertas, setOfertas] = useState<Oferta[]>([])

  const adicionarOferta = (oferta: Oferta) => {
    setOfertas((prev) => [...prev, oferta])
  }

  return (
    <OfertasContext.Provider value={{ ofertas, adicionarOferta }}>
      {children}
    </OfertasContext.Provider>
  )
}

export const useOfertas = () => {
  const context = useContext(OfertasContext)
  if (!context) {
    throw new Error('useOfertas must be used within an OfertasProvider')
  }
  return context
}
