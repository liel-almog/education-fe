import Leaflet from "../components/leaflet/leaflet";
import { Navbar } from "../components/Navbar";
import { SelectedPolygonProvider } from "../contexts/selected-polygon.context";
import "./App.scss";

export default function App() {
  return (
    <SelectedPolygonProvider>
      <header className="navbar">
        <Navbar></Navbar>
      </header>
      <main className="container">
        <aside className="aside">
          <h1>aside</h1>
        </aside>
        <section className="leaflet">
          <Leaflet></Leaflet>
        </section>
      </main>
    </SelectedPolygonProvider>
  );
}
