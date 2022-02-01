import { createContext, useState } from "react";
import json from "../../neighbourhoods.json";
import { Polygon } from "../types/area.interface";

interface SelectedPolygonContextArgs {
  selectedPolygon: string | null;
  setSelectedPolygon: (polygon: string | null) => void;
  findPolygon: () => Polygon | undefined;
}

const SelectedPolygonContext = createContext<SelectedPolygonContextArgs>({
  selectedPolygon: null,
  setSelectedPolygon: () => {},
  findPolygon: () => undefined,
});

interface SelectedPolygonProviderProps {}

export const SelectedPolygonProvider: React.FC<SelectedPolygonProviderProps> = (props) => {
  const [selectedPolygon, setSelectedPolygon] = useState<string | null>(null);

  const findPolygon = () => {
    const polygon: Polygon | undefined = json.features.find(
      (feature) => feature.properties.UniqueId === selectedPolygon
    );

    return polygon;
  };

  return (
    <SelectedPolygonContext.Provider value={{ selectedPolygon, setSelectedPolygon, findPolygon }}>
      {props.children}
    </SelectedPolygonContext.Provider>
  );
};

export default SelectedPolygonContext;
