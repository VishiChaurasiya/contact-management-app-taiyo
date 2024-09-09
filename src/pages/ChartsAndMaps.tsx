import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  fetchCountryData,
  fetchHistoricalData,
} from "@/services/covidDataService";
import { CountryCovidData, HistoricalData } from "@/types/covidData";

const ChartsAndMaps: React.FC = () => {
  const {
    data: historicalData,
    isLoading: isHistoricalLoading,
    isError: isHistoricalError,
    error: historicalError,
  } = useQuery<HistoricalData>("historicalData", fetchHistoricalData);

  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
    error: countryError,
  } = useQuery<CountryCovidData[]>("countryData", fetchCountryData);

  if (isHistoricalLoading || isCountryLoading) return <div>Loading...</div>;
  if (isHistoricalError) {
    const errorMessage = (historicalError as Error).message;
    return <div>Error loading historical data: {errorMessage}</div>;
  }
  if (isCountryError) {
    const errorMessage = (countryError as Error).message;
    return <div>Error loading country data: {errorMessage}</div>;
  }

  // Prepare data for the line chart
  const historicalCases = historicalData?.cases
    ? Object.entries(historicalData.cases).map(([date, cases]) => ({
        date,
        cases,
      }))
    : [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Cases Fluctuation</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalCases}>
            <XAxis dataKey="date" stroke="#666" tick={false} />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#8884d8"
              dot={true}
              strokeWidth={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-96 my-8">
        <h2 className="text-xl font-semibold mb-2">
          COVID-19 Cases by Country
        </h2>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData?.map((country) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <strong>{country.country}</strong>
                <br />
                Active cases: {country.active}
                <br />
                Recovered cases: {country.recovered}
                <br />
                Deaths: {country.deaths}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
