import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Offcanvas } from 'react-bootstrap'
import { FaShoppingCart, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

type Oferta = {
  id: number
  nome: string
  preco: number
  descricao: string
  imagem: string
  categoria: string
}

type CarrinhoItem = {
  oferta: Oferta
  quantidade: number
}

const App = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('')
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([])
  const [showCarrinho, setShowCarrinho] = useState(false)
  const [numero, setNumero] = useState('')
  const [mostrarCampoNumero, setMostrarCampoNumero] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const carregarOfertas = async () => {
      try {
        const response = await fetch('./ofertas.json')
        const ofertasJson = await response.json()
        const ofertasLocalStorage = JSON.parse(localStorage.getItem('ofertas') || '[]')
        setOfertas([...ofertasJson, ...ofertasLocalStorage])
      } catch (error) {
        const ofertasLocalStorage = JSON.parse(localStorage.getItem('ofertas') || '[]')
        setOfertas(ofertasLocalStorage)
      }
    }

    carregarOfertas()
  }, [])

  const excluirOferta = (id: number) => {
    const ofertasLocalStorage = JSON.parse(localStorage.getItem('ofertas') || '[]')
    const atualizadas = ofertasLocalStorage.filter((oferta: Oferta) => oferta.id !== id)
    localStorage.setItem('ofertas', JSON.stringify(atualizadas))
    setOfertas(prev => prev.filter(oferta => oferta.id !== id))
  }

  const ofertasFiltradas = categoriaSelecionada
    ? ofertas.filter(oferta => oferta.categoria === categoriaSelecionada)
    : ofertas

  const adicionarAoCarrinho = (oferta: Oferta) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(item => item.oferta.id === oferta.id)
      if (itemExistente) {
        return prevCarrinho.map(item =>
          item.oferta.id === oferta.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      } else {
        return [...prevCarrinho, { oferta, quantidade: 1 }]
      }
    })
  }

  const removerDoCarrinho = (id: number) => {
    setCarrinho(prevCarrinho =>
      prevCarrinho.filter(item => item.oferta.id !== id)
    )
  }

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.oferta.preco * item.quantidade, 0)
  }

  const totalItensCarrinho = carrinho.reduce((soma, item) => soma + item.quantidade, 0)

  const finalizarCompra = () => {
    if (carrinho.length === 0) return
    setMostrarCampoNumero(true)
  }

  const enviarParaWhatsApp = () => {
    const numeroWhatsApp = numero.replace(/\D/g, '')
    let mensagem = 'Olá, gostaria de fazer a seguinte compra:\n\n'
    carrinho.forEach(item => {
      mensagem += `${item.quantidade} x ${item.oferta.nome} - R$ ${item.oferta.preco.toFixed(2)}\n`
    })
    mensagem += `\nTotal: R$ ${calcularTotal().toFixed(2)}\n\nAguardo confirmação.`
    const mensagemEncoded = encodeURIComponent(mensagem)
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`
    window.open(url, '_blank')
  }

  return (
    <Container className="py- px-0" fluid>
      <div style={{ backgroundColor: '#000', color: '#FFD700' }} className="py-5 px-4 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Ofertas da Semana</h1>
        <Button
          style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000' }}
          onClick={() => navigate('/cadastro-oferta')}
        >
          <FaPlus className="me-2" />
          Cadastrar Nova Oferta
        </Button>
      </div>

      <Container className="py-4">
        <Form.Group className="mb-4 w-50 mx-auto">
          <Form.Select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            style={{ borderColor: '#FFD700', borderRadius: '0.5rem', boxShadow: 'none' }}
          >
            <option value="">Filtrar por categoria</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Higiene">Higiene</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Outros">Outros</option>
          </Form.Select>
        </Form.Group>

        <Row className="justify-content-center">
          {ofertasFiltradas.length === 0 ? (
            <p>Nenhum produto encontrado</p>
          ) : (
            ofertasFiltradas.map((oferta) => (
              <Col key={oferta.id} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                <div className="card h-100 w-100 d-flex flex-column" style={{ backgroundColor: '#111', color: '#fff' }}>
                  <img
                    src={oferta.imagem}
                    className="card-img-top"
                    alt={oferta.nome}
                    style={{
                      objectFit: 'contain',
                      height: '180px',
                      backgroundColor: '#fff',
                      padding: '10px'
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{oferta.nome}</h5>
                    <p className="card-text flex-grow-1">{oferta.descricao}</p>
                    <p className="card-text fw-bold">R$ {oferta.preco.toFixed(2)}</p>
                    <div className="d-flex justify-content-center">
                      <Button
                        style={{
                          backgroundColor: '#FFD700',
                          borderColor: '#FFD700',
                          color: '#000',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        onClick={() => adicionarAoCarrinho(oferta)}
                      >
                        <FaShoppingCart className="me-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>

        <div className="position-fixed bottom-0 end-0 p-3">
          <Button
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000' }}
            onClick={() => setShowCarrinho(true)}
          >
            <FaShoppingCart /> {totalItensCarrinho} Itens
          </Button>
        </div>

        <Offcanvas show={showCarrinho} onHide={() => setShowCarrinho(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Carrinho de Compras</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <ul>
                {carrinho.map(item => (
                  <li key={item.oferta.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>{item.oferta.nome}</strong> - R$ {item.oferta.preco.toFixed(2)} x {item.quantidade}
                    </div>
                    <Button variant="danger" size="sm" className="ms-3" onClick={() => removerDoCarrinho(item.oferta.id)}>
                      Remover
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <h4>Total: R$ {calcularTotal().toFixed(2)}</h4>

            {mostrarCampoNumero && (
              <div className="mt-3">
                <Form.Label>Informe seu número com DDD:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="31999999999"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="mb-2"
                />
                <Button
                  style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000' }}
                  className="w-100"
                  onClick={enviarParaWhatsApp}
                >
                  Enviar via WhatsApp
                </Button>
              </div>
            )}

            {!mostrarCampoNumero && (
              <Button
                style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#000' }}
                className="w-100 mt-3"
                onClick={finalizarCompra}
                disabled={carrinho.length === 0}
              >
                Finalizar Compra
              </Button>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Container>
  )
}

export default App
