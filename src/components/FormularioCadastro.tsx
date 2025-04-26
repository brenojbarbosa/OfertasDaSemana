import { useState } from 'react'

type Oferta = {
  nome: string
  preco: number
  descricao: string
  imagem: string
  categoria: string
}

type Props = {
  onSubmit: (novaOferta: Oferta) => void
}

const FormularioCadastro = ({ onSubmit }: Props) => {
  const [form, setForm] = useState<Oferta>({
    nome: '',
    preco: 0,
    descricao: '',
    imagem: '',
    categoria: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({ nome: '', preco: 0, descricao: '', imagem: '', categoria: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome do Produto</label>
        <input type="text" className="form-control" id="nome" name="nome" value={form.nome} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="preco" className="form-label">Preço</label>
        <input type="number" className="form-control" id="preco" name="preco" value={form.preco} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <textarea className="form-control" id="descricao" name="descricao" value={form.descricao} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="imagem" className="form-label">URL da Imagem</label>
        <input type="text" className="form-control" id="imagem" name="imagem" value={form.imagem} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoria</label>
        <select className="form-select" id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required>
          <option value="">Selecione uma categoria</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Higiene">Higiene</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Outros">Outros</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Cadastrar Oferta</button>
    </form>
  )
}

export default FormularioCadastro
