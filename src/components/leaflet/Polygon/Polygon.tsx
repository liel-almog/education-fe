import { Icon, latLngBounds, LatLngExpression, PathOptions } from "leaflet";
import { useMemo } from "react";
import {
  Marker,
  Polygon as LeafPolygon,
  PolygonProps as LeafPolygonProps,
  Tooltip,
  useMap
} from "react-leaflet";
import colors from "../../../styles/color-palette.module.scss";
import { Geometry, School } from "../../../types/area.interface";

export interface PolygonProps extends Omit<LeafPolygonProps, "positions"> {
  geometry: Geometry;
  schools: School[];
}

export const Polygon: React.VFC<PolygonProps> = ({ geometry, schools }) => {
  const map = useMap();

  const polygonOptions: PathOptions = {
    color: "white",
    fillColor: colors.hookersGreen,
    fillOpacity: 0.4,
    fill: true,
    weight: 5,
  };

  const coordinates = useMemo(() => {
    return geometry.coordinates[0].map((coordinate) => {
      return [coordinate[1], coordinate[0]];
    }) as LatLngExpression[];
  }, [geometry]);

  const schoolsMarkers = useMemo(() => {
    return schools.map((school) => {
      return (
        <Marker
          icon={new Icon({ iconUrl: "/school-svgrepo-com.svg", iconSize: [24, 24] })}
          key={school.id}
          position={[school.latitude, school.longitude]}
        >
          <Tooltip direction="center">{school.name}</Tooltip>
        </Marker>
      );
    });
  }, [schools]);

  return (
    <LeafPolygon
      eventHandlers={{
        click() {
          map.fitBounds(latLngBounds(coordinates));
        },
      }}
      pathOptions={polygonOptions}
      positions={coordinates}
    >
      {schoolsMarkers}
    </LeafPolygon>
  );
};
