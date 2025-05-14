

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Buscar produto..."
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
