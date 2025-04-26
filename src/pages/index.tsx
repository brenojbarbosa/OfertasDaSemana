import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Oferta = {
  id: number
  nome: string
  preco: number
  descricao: string
  imagem: string
  categoria: string
}

const Home = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([])

  useEffect(() => {
    fetch('/ofertas.json')
      .then(res => res.json())
      .then(data => setOfertas(data))
      .catch(error => console.error('Erro ao carregar as ofertas:', error))
  }, [])

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Ofertas da Semana</h1>

      
      <div className="text-center mb-4">
        <Link to="/cadastro-oferta">
          <Button variant="success">Cadastrar Nova Oferta</Button>
        </Link>
      </div>

      <Row className="justify-content-center">
        {ofertas.length === 0 ? (
          <p>Nenhum produto encontrado</p>
        ) : (
          ofertas.map((oferta) => (
            <Col key={oferta.id} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
              <div className="card h-100">
                <img src={oferta.imagem} className="card-img-top" alt={oferta.nome} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{oferta.nome}</h5>
                  <p className="card-text">{oferta.descricao}</p>
                  <p className="card-text fw-bold">R$ {oferta.preco.toFixed(2)}</p>
                  <Button variant="primary">Adicionar ao Carrinho</Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

export default Home
