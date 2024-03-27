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
    const country = countriesFormatted.find((item) => item.value === value);
    return country ? country : null;
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

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };

  const getCityByCountryAndName = (countryCode: string, cityName: string) => {
    return City.getCitiesOfCountry(countryCode)?.find(
      (item) => item.name === cityName
    );
  };

  const getAllCountries = () => {
    return Country.getAllCountries().map((item) => ({
      value: item.isoCode,
      label: item.name,
      flag: item.flag,
    }));
  };

  const getCityByCountry = (countryCode: string) => {
    return City.getCitiesOfCountry(countryCode)?.map((item) => ({
      value: item.name,
      label: item.name,
      flag: item.countryCode,
      latLang: [item.latitude, item.longitude],
    }));
  };

  const getStateByCountry = (countryCode: string) => {
    return State.getStatesOfCountry(countryCode)?.map((item) => ({
      value: item.isoCode,
      label: item.name,
      flag: item.countryCode,
    }));
  };

  const getCityByState = (countyCode: string, stateCode: string) => {
    return City.getCitiesOfState(countyCode, stateCode)?.map((item) => ({
      value: item.name,
      label: item.name,
      flag: item.countryCode,
      latLang: [item.latitude, item.longitude],
    }));
  };

  return {
    getAllCountries,
    getAllCities,
    getCityByValue,
    getCityByCountry,
    getStateByCountry,
    getCityByState,
    getCountryByValue,
    getCityByCountryAndName,
  };
};
