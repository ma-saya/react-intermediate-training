import { useState, useEffect } from "react";
import type { WeatherDate } from "./types/weather";
import { WeatherDisplay } from "./componets/WeatherDisplay";

const LOCATIONS = [
  { name: "東京", lat: 35.6895, lng: 139.6917 },
  { name: "大阪", lat: 34.6937, lng: 135.5023 },
  { name: "札幌", lat: 43.0618, lng: 141.3545 },
  { name: "那覇", lat: 26.2124, lng: 127.6809 },
];

export default function App() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [weather, setWeather] = useState<WeatherDate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const city = LOCATIONS[selectedCityIndex];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("データの取得に失敗しました。");
        const date = await response.json();

        setWeather({
          temperature: date.current_weather.temperature,
          weatherCode: date.current_weather.weathercode,
        });
      } catch (err) {
        SyntaxError("天気の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [selectedCityIndex]);

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>API天気予報</h1>

      <select
      value={selectedCityIndex}
      onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
      style={{padding: "10px", width: "100%", fontSize: "16px", borderRadius: "5px"}}
      >
        {LOCATIONS.map((city, index) => (
          <option key={index} value={index}>
            {city.name}
          </option>
        ))}
      </select>
      <WeatherDisplay weather={weather} loading={loading} error={error} />
    </div>
  )
}