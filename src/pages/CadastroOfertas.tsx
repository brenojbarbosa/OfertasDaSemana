import { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CadastroOferta = () => {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagem, setImagem] = useState('')
  const [categoria, setCategoria] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const novaOferta = {
      id: Date.now(),
      nome,
      preco: parseFloat(preco.replace(',', '.')),
      descricao,
      imagem,
      categoria,
    }

    const ofertasSalvas = JSON.parse(localStorage.getItem('ofertas') || '[]')
    localStorage.setItem('ofertas', JSON.stringify([...ofertasSalvas, novaOferta]))

    setNome('')
    setPreco('')
    setDescricao('')
    setImagem('')
    setCategoria('')

    navigate('/')
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 w-100" style={{ maxWidth: '600px', backgroundColor: '#fff7f4', borderRadius: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-4" style={{ color: '#9656a1' }}>Cadastro de Nova Oferta</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ borderRadius: '0.5rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="text"
              inputMode="decimal"
              pattern="[0-9]+([,\.][0-9]{1,2})?"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              style={{ borderRadius: '0.5rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={{ borderRadius: '0.5rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL da Imagem</Form.Label>
            <Form.Control
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
              style={{ borderRadius: '0.5rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              style={{ borderRadius: '0.5rem', backgroundColor: '#fff7f4' }}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Higiene">Higiene</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Outros">Outros</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              style={{ borderRadius: '0.5rem' }}
            >
              Voltar para Home
            </Button>
            <Button
              style={{ backgroundColor: '#9656a1', borderColor: '#9656a1', borderRadius: '0.5rem' }}
              type="submit"
            >
              Cadastrar Oferta
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default CadastroOferta
