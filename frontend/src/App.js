// App.js
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import MusicianCard from "./MusicianCard";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicians: [],
    };
  }

  componentDidMount() {
    this.getMusicians();
  }

  getMusicians() {
    axios
      .get("/api/musician/")
      .then((response) => {
        this.setState({ musicians: response.data });
      })
      .catch((error) => {
        console.error("Error fetching musicians: ", error);
      });
  }

  render() {
    const { musicians } = this.state;

    return (
      <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center mb-4">Musician List</h1>
        <ul className="list-unstyled">
          {musicians.map((musician) => (
            <li key={musician.id}>
              <MusicianCard musician={musician} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
