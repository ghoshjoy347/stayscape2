"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries, useCities } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/018/749/811/original/3d-purple-map-pointer-pin-generative-ai-png.png",
  iconSize: [50, 50],
});

export default function Map({ locationValue, latLang }: { locationValue: string, latLang: [number, number] | undefined }) {
  const { getCityByValue } = useCities();
  const cityLatLang = getCityByValue(locationValue)?.latLang;

  // TODO: remove following 2 lines
  const { getCountryByValue } = useCountries();
  // const latLang = getCountryByValue(locationValue)?.latLang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
    </MapContainer>
  );
}