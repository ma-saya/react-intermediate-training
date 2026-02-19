import { useState } from 'react';
import type { User } from './types/auth';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    if (email === "test@example.com" && password === "password123") {
      setUser({
        username: "テストユーザー",
        email: email,
      });
    } else {
      setLoginError("メールアドレスまたはパスワードが正しくありません。");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoginError(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} error={loginError} />
      )}
    </div>
  )
}