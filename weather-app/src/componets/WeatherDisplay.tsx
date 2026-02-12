import type { WeatherDate } from "../types/weather";

type WeatherDisplayProps = {
  weather: WeatherDate | null;
  loading: boolean;
  error: string | null;
};

export const WeatherDisplay = ({ weather, loading, error }: WeatherDisplayProps) => {
  if (error) {
    return <p style={{ color: "red" }}>⚠ {error}</p>
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!weather) {
    return null;
  }

  const getWeatherInfo = (code: number) => {
    if (code === 0) return { label: "快晴", icon: "☀️" };
    if (code >= 1 && code <= 3) return { label: "晴れ/曇り", icon: "🌤️" };
    if (code >= 45 && code <= 48) return { label: "霧", icon: "🌫️" };
    if (code >= 71) return { label: "雪", icon: "☃" };
    return { label: "不明", icon: "?" };
  };

  const info = getWeatherInfo(weather.weatherCode);

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: "50px" }}>{info.icon}</div>
      <h2 style={{ margin: "10px 0" }}>{weather.temperature}℃</h2>
      <p style={{ fontSize: "20px", color: "#555" }}>{info.label}</p>
    </div>
  )
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "30px",
  textAlign: "center" as const,
  backgroundColor: "white",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  marginTop: "20px",
};