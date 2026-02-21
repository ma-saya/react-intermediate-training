import {useState, useEffect} from 'react';
import type {Repository} from './types/search';
import { SearchInput } from './components/SearchInput';
import { SearchResults } from './components/SearchResults';

export default function App() {
  const [inputText, setInputText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(inputText);
    }, 500);
    return () => clearInterval(timerId);
  }, [inputText]);

  useEffect(() => {
    if (!debouncedText) {
      setResults([]);
      return;
    }

    const serchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${debouncedText}&per_page=10`);
        if (!response.ok)
          throw new Error("検索に失敗しました");

        const data = await response.json();
        setResults(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    serchRepos();
  }, [debouncedText]);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Github リアルタイム検索</h1>
      <SearchInput value={inputText} onChange={setInputText} />
      <SearchResults results={results} loading={loading} error={error} />
    </div>
  )
}