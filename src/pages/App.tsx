import Leaflet from "../components/leaflet/leaflet";
import { Navbar } from "../components/Navbar";
import "./App.scss";

export default function App() {
  return (
    <>
      <header className="navbar" >
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
    </>
  );
}
