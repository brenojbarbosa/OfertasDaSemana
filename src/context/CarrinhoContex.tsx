
import { createContext, useContext, useState, ReactNode } from 'react'
import { Oferta } from '../types/Oferta'

type CarrinhoContextType = {
  itensCarrinho: Oferta[]
  adicionarAoCarrinho: (oferta: Oferta) => void
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined)

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itensCarrinho, setItensCarrinho] = useState<Oferta[]>([])

  const adicionarAoCarrinho = (oferta: Oferta) => {
    setItensCarrinho((prev) => [...prev, oferta])
  }

  return (
    <CarrinhoContext.Provider value={{ itensCarrinho, adicionarAoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext)
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider')
  }
  return context
}
