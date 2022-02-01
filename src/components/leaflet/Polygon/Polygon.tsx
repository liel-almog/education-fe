import {
  Icon,
  latLngBounds,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  PathOptions
} from "leaflet";
import { useContext, useMemo } from "react";
import {
  Marker,
  Polygon as LeafPolygon,
  PolygonProps as LeafPolygonProps,
  Tooltip,
  useMap
} from "react-leaflet";
import SelectedPolygonContext from "../../../contexts/selected-polygon.context";
import colors from "../../../styles/color-palette.module.scss";
import { Geometry, School } from "../../../types/area.interface";

export interface PolygonProps extends Omit<LeafPolygonProps, "positions"> {
  geometry: Geometry;
  schools: School[];
  id: string;
}

export const Polygon: React.VFC<PolygonProps> = ({ geometry, schools, id }) => {
  const map = useMap();
  const { selectedPolygon, setSelectedPolygon, findPolygon } = useContext(SelectedPolygonContext);

  const polygonOptions: PathOptions = {
    color: "white",
    fillColor: colors.hookersGreen,
    fillOpacity: selectedPolygon === id ? 0.2 : 0.5,
    fill: true,
    weight: 5,
  };

  const eventHandlers: LeafletEventHandlerFnMap = {
    click() {
      map.fitBounds(latLngBounds(coordinates));
      setSelectedPolygon(id);
    },
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
    <LeafPolygon eventHandlers={eventHandlers} pathOptions={polygonOptions} positions={coordinates}>
      {selectedPolygon === id && schoolsMarkers}
    </LeafPolygon>
  );
};
