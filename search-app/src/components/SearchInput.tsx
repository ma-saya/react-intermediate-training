type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div style={{ marginBottom: "1px" }}>
      <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Githubリポジトリを検索"
        style={{
        width: "100%",
          padding: "12px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box" as const,
        }}
      />
    </div>
  )
}