import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MusicianList from "./MusicianList";
import MusicianSong from "./MusicianSongs";
import Authorization from "./Authorization";
import Buttons from "./Buttons";

const App = () => (
  <Router>
     <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <Routes>

        <Route path="/" element={<Buttons />} />
        <Route path="/musician/*" element={<MusicianList />} />
        <Route path="/musician/:id" element={<MusicianSong />} />
        <Route path="/aut" element={<Authorization />} />
      </Routes>
     </div>
  </Router>
);

export default App;
