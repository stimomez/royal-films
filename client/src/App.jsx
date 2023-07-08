import './App.css';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateFilm from './pages/CreateFilm';
import Films from './pages/Films';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-film" element={<CreateFilm />} />
        <Route path="/update-film/:id" element={<CreateFilm />} />
        <Route path="/films" element={<Films />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
