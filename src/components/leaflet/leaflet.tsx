import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import json from "../../../neighbourhoods.json";
import classes from "./leaflet.module.scss";
import { Polygon } from "./Polygon";

const Leaflet = () => {
  const multiPolygon = useMemo(() => {
    return json.features.map((feature) => {
      return (
        <Polygon
          key={feature.properties.UniqueId}
          geometry={feature.geometry}
          schools={feature.properties.schools}
        ></Polygon>
      );
    });
  }, []);

  return (
    <MapContainer
      center={[32.07721, 34.799939]}
      zoom={13.2}
      scrollWheelZoom={true}
      attributionControl={false}
      className={classes.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {multiPolygon}
    </MapContainer>
  );
};

export default Leaflet;

/**
 * return feature.geometry.coordinates[0].map((coordinate) => {
        return [coordinate[1], coordinate[0]];
      });
       */
