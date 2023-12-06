// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";


import MusicianList from "./component/MusicianList";
import MusicianSong from "./component/MusicianSongs";
import Buttons from "./component/Buttons";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Profile from "./views/Profile";
import Navbar from "./views/Navbar";

const App = () => (
  <Router>
    <AuthProvider>
      <Navbar />
      <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Buttons />} />
          <Route path="/musician/*" element={<MusicianList />} />
          <Route path="/musician/:id" element={<MusicianSong />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </div>
    </AuthProvider>
  </Router>
);

export default App;
