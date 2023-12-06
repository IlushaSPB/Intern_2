// MusicianList.js
import React, { Component } from "react";
import axios from "axios";
import MusicianCard from "./MusicianCard";

class MusicianList extends Component {
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

      <ul className="list-unstyled">
         <h1 className="text-center mb-4">Musician List</h1>
        {musicians.map((musician) => (
          <li key={musician.id}>
            <MusicianCard musician={musician} />
          </li>
        ))}

      </ul>

    );

  }
}

export default MusicianList;
