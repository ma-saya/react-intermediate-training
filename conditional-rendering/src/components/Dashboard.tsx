import type { User } from '../types/auth';

type Props = {
  user: User;
  onLogout: () => void;
};

export const Dashboard = ({ user, onLogout }: Props) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ようこそ、{user.username}さん</h1>
      <p>メールアドレス: {user.email}</p>
      <p>現在、会員限定エリアにアクセスしています。</p>

      <button
        onClick={onLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ログアウト
      </button>
    </div>
  );
};