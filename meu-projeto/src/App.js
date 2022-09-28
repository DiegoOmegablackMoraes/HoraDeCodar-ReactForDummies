import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Condicional from "./components/Condicional";
import Evento from "./components/Evento";
import Form from "./components/Form";
import OutraLista from "./components/OutraLista";
import Saudacao from "./components/Saudacao";
import SeuNome from "./components/SeuNome";
import Home from "./components/pages/Home"; // pagina Home
import Empresa from "./components/pages/Empresa";
import Contato from "./components/pages/Contato";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  const meusItens = ["React", "Vue", "Angular"];
  const [nome, setNome] = useState(); // declarando state do filho no pai
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      <Footer />
      <div className="App">
        <h1>Testando Eventos</h1>
        <Form />
        <Evento num={1} />

        <h1>Renderização Condicional</h1>
        <Condicional />

        <h1>Renderização de listas</h1>
        <OutraLista itens={meusItens} />
        <OutraLista itens={[]} />

        <h1>State Lift</h1>
        <h4>
          Técnica utilizada para acessar as props de um componente filho através
          do pai. Basicamente, é declarar o STATE no componente PAI, ao invés de
          fazer no filho.
        </h4>
        <SeuNome setNome={setNome} />
        <Saudacao nome={nome} />
      </div>
    </Router>
  );
}

export default App;
