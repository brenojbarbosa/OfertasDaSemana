interface Props {
    categorias: string[]
    onFiltrar: (categoria: string) => void
  }
  
  export default function FiltroCategoria({ categorias, onFiltrar }: Props) {
    return (
      <div className="mb-3 text-center">
        <select
          className="form-select w-auto d-inline"
          onChange={(e) => onFiltrar(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    )
  }
  