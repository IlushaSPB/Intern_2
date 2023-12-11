// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import { Button } from "react-bootstrap";

import SongForm from "./component/SongForm";
import MusicianForm from "./component/MusicianForm";
import MusicianList from "./component/MusicianList";
import MusicianSong from "./component/MusicianSongs";
import Buttons from "./component/Buttons";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Profile from "./views/Profile";
import Navbar from "./views/Navbar";
import SearchPage from "./search/SearchPage";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }
  return (
      !loading && (
      <Router>
        <AuthProvider>
          <Navbar/>
          <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <Routes>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/" element={<Buttons/>}/>
              <Route path="/musician/*" element={<MusicianList/>}/>
              <Route path="/musician/:id" element={<MusicianSong/>}/>
              <Route path="/login" element={<Loginpage/>}/>
              <Route path="/register" element={<Registerpage/>}/>
              <Route path="/search" element={<SearchPage/>}/>
              <Route
                  path="/add_musician"
                  element={
                    <>
                      <Button variant="primary" onClick={handleShow}>
                        Add Musician
                      </Button>
                      <MusicianForm showModal={showModal} handleClose={handleClose}/>
                    </>
                  }
              />
                <Route
                  path="/add_song"
                  element={
                    <>
                      <Button variant="primary" onClick={handleShow}>
                        Add Song
                      </Button>
                      <SongForm showModal={showModal} handleClose={handleClose}/>
                    </>
                  }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
      )
  );
};

export default App;
