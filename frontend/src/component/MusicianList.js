import React, { Component } from "react";
import axios from "axios";
import MusicianCard from "./MusicianCard";
import InfiniteScroll from "react-infinite-scroll-component";

class MusicianList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicians: [],
      hasMore: true, // флаг для определения наличия дополнительных данных
    };
    this.page = 1; // начальная страница
  }

  componentDidMount() {
    this.getMusicians();
  }

  getMusicians = () => {
    axios
      .get(`/api/musician/?page=${this.page}`)
      .then((response) => {
        const newMusicians = response.data;
        this.setState((prevState) => ({
          musicians: [...prevState.musicians, ...newMusicians],
          hasMore: newMusicians.length > 2, // устанавливаем флаг в зависимости от наличия новых данных
        }));
        this.page += 1; // увеличиваем страницу для следующего запроса
      })
      .catch((error) => {
        console.error("Error fetching musicians: ", error);
      });
  };

  render() {
    const { musicians, hasMore } = this.state;

    return (
      <InfiniteScroll
        dataLength={musicians.length}
        next={this.getMusicians}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <ul className="list-unstyled">
          <h1 className="text-center mb-4">Musician List</h1>
          {musicians.map((musician) => (
            <li key={musician.id}>
              <MusicianCard musician={musician} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    );
  }
}

export default MusicianList;
