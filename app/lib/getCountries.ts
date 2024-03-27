import countries from "world-countries";
import { Country, City, State } from "country-state-city";

const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latLang: item.latlng,
  region: item.region,
}));

const cityFormatted = City.getAllCities().map((item) => ({
  value: item.countryCode,
  label: item.name,
  flag: item.countryCode,
  latLang: [item.latitude, item.longitude],
}));

export const useCountries = () => {
  const getAllCountries = () => {
    return countriesFormatted;
  };

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};

export const useCities = () => {
  const getAllCities = () => {
    return cityFormatted;
  };

  const getCityByValue = (value: string) => {
    return cityFormatted.find((item) => item.value === value);
  };

  return {
    getAllCities,
    getCityByValue,
  };
};
