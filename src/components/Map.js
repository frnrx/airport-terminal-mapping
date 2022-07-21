import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  getCenterPoint,
  getTerminals,
  inputValidation,
} from "../helpers/functions";

const MapPage = ({ geoJSONData, loading, requestNewArea }) => {
  const [terminals, setTerminals] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [bbox, setBbox] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bbox) {
      requestNewArea(bbox);
    }
  }, [bbox, requestNewArea]);

  useEffect(() => {
    if (geoJSONData && geoJSONData.features) {
      const newTerminals = getTerminals(geoJSONData.features);
      if (newTerminals && newTerminals.length > 0) {
        setTerminals(newTerminals);
      } else {
        setError("No terminals found in this area.");
      }
    }
  }, [geoJSONData]);

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    setBbox(null);
  };

  const handleClick = () => {
    setError(null);
    if (inputValidation(inputValue)) {
      const values = inputValue.split(",").map((v) => Number(v));
      setCoordinates([
        [values[0], values[1]],
        [values[2], values[3]],
      ]);
      setBbox(inputValue);
    } else {
      setError("Coordinate format invalid.");
    }
  };

  return (
    <div className="page_container">
      <div className="info">
        <h1>Airport Terminal Mapping</h1>
        <p>A visualization of airports terminals given a boundary box.</p>
        <div className="form">
          <span className="input_label">Coordinates:</span>
          <input onChange={handleChangeInput} value={inputValue} />
          <button onClick={handleClick}>Go!</button>
        </div>
        {!bbox && (
          <span>
            Coordinate example: 13.436046,52.347897,13.550201,52.389717
          </span>
        )}
        {error ? <p>{error}</p> : null}
        {loading && <p>Loading...</p>}
      </div>

      {coordinates && !loading && (
        <div className="map_container">
          <MapContainer
            center={getCenterPoint(coordinates)}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {terminals &&
              terminals.map((terminal) => (
                <Marker
                  position={getCenterPoint(terminal.geometry.coordinates[0])}
                  key={terminal.id}
                >
                  <Popup>
                    <p>{`Name: ${terminal.properties.name}`}</p>
                    {terminal.properties.wheelchair ? (
                      <p>{`Wheelchair: ${terminal.properties.wheelchair}`}</p>
                    ) : null}
                    {terminal.properties.note ? (
                      <p>{`Note: ${terminal.properties.note}`}</p>
                    ) : null}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default MapPage;
