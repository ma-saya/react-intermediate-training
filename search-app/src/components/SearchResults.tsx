import type { Repository } from '../types/search';

type Props = {
  results: Repository[];
  loading: boolean;
  error: string | null;
};

export const SearchResults = ({ results, loading, error }: Props) => {
  if (loading) return <p style={{ textAlign: "center"}}>検索中</p>
  if (error) return <p style={{ color: "red", textAlign: "center" }}>⚠ {error}</p>
  if (results.length === 0) return <p style={{ color: "#888", textAlign: "center"}}>検索結果がありません</p>

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((repo) => (
        <li
        key={repo.id}
          style={{
          padding: "15px",
            border: "1px solid #eee",
            borderRadius: "8px",
            marginBottom: "10px",
            backgroundColor: "#fff",
          }}
        >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <a 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#0366d6", textDecoration: "none" }}>
              {repo.name}
            </a>
            <span style={{ color: "#f1e05a", fontWeight: "bold" }}>
              ★{repo.stargazers_count.toLocaleString()}
            </span>
          </div>
          <p style={{ color: "#586069", fontSize: "14px", marginTop: "5px" }}>
            {repo.description || "説明無し"}
          </p>
        </li>
      ))}
    </ul>
  )
}
