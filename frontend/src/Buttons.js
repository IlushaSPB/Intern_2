import React from "react";
import { Link } from "react-router-dom";

const Buttons = () => (
  <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
    <h1 className="text-center mb-4">Music App</h1>

    <div>
      {/* Button for MusicianList */}
      <Link to="/musician" style={{ marginRight: '10px' }}>
        <button>Musician List</button>
      </Link>
      {/* Button for Authorization */}
      <Link to="/aut">
        <button>Authorization</button>
      </Link>
    </div>
  </div>
);

export default Buttons;
