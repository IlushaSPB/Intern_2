import React from "react";


const Buttons = () => (
  <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
    <h1 className="text-center mb-4">Welcome to the Music App</h1>
    <img
      src="https://placekitten.com/800/400" // Replace with your desired image URL
      alt="Beautiful Image"
      style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    />
    <p className="mt-4">
      Explore the world of music and discover amazing tracks from talented musicians.
    </p>
  </div>
);

export default Buttons;
