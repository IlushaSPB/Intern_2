import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:8000/api';

function SearchPage() {
 const [data, setData] = useState([]);
 const [searchTxt, setSearchTxt] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 2;

 useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const savedSearchTxt = urlSearchParams.get('title');
    const savedPage = parseInt(urlSearchParams.get('page')) || 1;

    if (savedSearchTxt) {
      setSearchTxt(savedSearchTxt);
    }
    setCurrentPage(savedPage);
 }, []);

 const fetchData = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    const endpoint = `${url}/posts/?title=${searchTxt}&offset=${offset}&limit=${itemsPerPage}`;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
 };

 useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 400);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('title', searchTxt);
    urlSearchParams.set('page', currentPage.toString());
    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`);

    return () => clearTimeout(timer);
 }, [searchTxt, currentPage]);

 const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTxt(value);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('title', value);
    urlSearchParams.set('page', '1'); // Сбрасываем страницу при изменении поискового запроса
    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`);
 };

 const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
 };

 return (
    <div className="Search" style={{ color: "black", textAlign: "center" }}>
      <form style={{ display: "inline-block" }}>
        <label htmlFor="search-txt">Search:</label>
        <input
          type="search"
          id="search-txt"
          value={searchTxt}
          onChange={handleInputChange}
          style={{ position: "static", marginTop: "50px" }}
        />
      </form>
      <ul className="list-group">
        {data &&
          data.map((e) => (
            <li key={e.id} className="list-group-item" style={{ color: "black" }}>
              <div className="card">
                <p className="card-title" style={{ color: "darkred" }}>{e.title}</p>
              </div>
            </li>
          ))}
      </ul>
      <div>
        {/* Простая навигация для примера */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
 );
}

export default SearchPage;