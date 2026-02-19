import { useState } from 'react';
type Props = {
  onLogin: (email: string, password: string) => void;
  error: string | null;
};

export const LoginForm = ({ onLogin, error }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!email || !password) {
      setValidationError("メールアドレスとパスワードを入力してください。");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div style={cardStyle}>
      <h2>ログイン</h2>
      {(error || validationError) && (
        <p style={{ color: "red", background: "#ffebee", padding: "10px" }}>
          {error || validationError}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{display: "block", marginBottom: "5px"}}>メールアドレス</label>
          <input 
          type="email"
          value={email}
            onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          placeholder='text@exmaple.com'
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>パスワード</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder='password123'
          />
        </div>
        <button type="submit" style={buttonStyle}>
          ログイン
        </button>
      </form>
    </div>
  )
}
const cardStyle = {
  border: "1px solid #ccc",
  padding: "30px",
  borderRadius: "8px",
  maxWidth: "400px",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  boxSizing: "border-box" as const, // パディングを含める
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};