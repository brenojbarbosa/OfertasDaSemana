

interface Props {
  oferta: {
    id: number
    nome: string
    preco: number
    descricao: string
    imagem: string
  }
}

export default function CardOferta({ oferta }: Props) {
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={oferta.imagem} className="card-img-top" alt={oferta.nome} />
      <div className="card-body">
        <h5 className="card-title">{oferta.nome}</h5>
        <p className="card-text">{oferta.descricao}</p>
        <p className="card-text fw-bold">R$ {oferta.preco.toFixed(2)}</p>
      </div>
    </div>
  )
}
