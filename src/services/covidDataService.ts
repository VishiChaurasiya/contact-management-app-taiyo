import {
  CountryCovidData,
  GlobalCovidData,
  HistoricalData,
} from "@/types/covidData";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_COVID_DATA_BASE_URL || "https://disease.sh/v3/covid-19";

// Fetch global COVID-19 data
export const fetchGlobalData = async (): Promise<GlobalCovidData> => {
  try {
    const response = await axios.get<GlobalCovidData>(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    throw error;
  }
};

// Fetch country-specific COVID-19 data
export const fetchCountryData = async (): Promise<CountryCovidData[]> => {
  try {
    const response = await axios.get<CountryCovidData[]>(
      `${BASE_URL}/countries`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching country data:", error);
    throw error;
  }
};

// Fetch historical COVID-19 data
export const fetchHistoricalData = async (): Promise<HistoricalData> => {
  try {
    const response = await axios.get<HistoricalData>(
      `${BASE_URL}/historical/all?lastdays=all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
