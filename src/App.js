import React, { useState, useCallback } from "react";
import osmtogeojson from "osmtogeojson";
import L from "leaflet";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import "./App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [geoJSONData, setGeoJSONData] = useState(null);

  const requestNewArea = useCallback(async (bbox) => {
    setLoading(true);
    fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`, {
      headers: { accept: "application/xml" },
    })
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((xmlData) => {
        setGeoJSONData(osmtogeojson(xmlData));
        setLoading(false);
      });
  }, []);

  return (
    <Map
      geoJSONData={geoJSONData}
      loading={loading}
      requestNewArea={requestNewArea}
    />
  );
};

export default App;
