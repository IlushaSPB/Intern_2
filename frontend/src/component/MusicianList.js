import React, { Component } from "react";
import axios from "axios";
import MusicianCard from "./MusicianCard";

class MusicianList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicians: [],
      nextPage: null, // Добавляем состояние для хранения номера следующей страницы
    };
  }

  componentDidMount() {
    this.getMusicians();
  }

  getMusicians = (page = 1) => {
    axios
      .get("/api/musician/", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        const newMusicians = response.data.results;
        const nextPage = response.data.next; // Получаем ссылку на следующую страницу

        this.setState((prevState) => ({
          musicians: [...prevState.musicians, ...newMusicians],
          nextPage: nextPage,
        }));
      })
      .catch((error) => {
        console.error("Error fetching musicians: ", error);
      });
  };

  loadMore = () => {
    const { nextPage } = this.state;
    if (nextPage) {
      const page = new URL(nextPage).searchParams.get("page");
      this.getMusicians(page);
    }
  };

  render() {
    const { musicians } = this.state;

    return (
      <div>
        <ul className="list-unstyled">
          <h1 className="text-center mb-4">Musician List</h1>
          {musicians.map((musician) => (
            <li key={musician.id}>
              <MusicianCard musician={musician} />
            </li>
          ))}
        </ul>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    );
  }
}

export default MusicianList;
