import { LatLngExpression } from "leaflet";
import { useMemo } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import json from "../../../neighbourhoods.json";
import classes from "./leaflet.module.scss";

const Leaflet = () => {
  const polygonOptions = { color: "white", fillColor: "yellow" };

  const multiPolygon = useMemo(() => {
    return json.features.map((feature) => {
      return feature.geometry.coordinates[0].map((coordinate) => {
        return [coordinate[1], coordinate[0]];
      });
    }) as LatLngExpression[][];
  }, []);

  return (
    <MapContainer
      center={[32.077210, 34.799939]}
      zoom={13.2}
      scrollWheelZoom={true}
      className={classes.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={polygonOptions} positions={multiPolygon} />
    </MapContainer>
  );
};

export default Leaflet;
