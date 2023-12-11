import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:8000/api';

function SearchPage() {
  const [data, setData] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('title'); // Default filter is 'title'
  const itemsPerPage = 2;



useEffect(() => {
  // Initialize state from localStorage if available
  const storedSearchTxt = localStorage.getItem('searchTxt');
  const storedSearchFilter = localStorage.getItem('searchFilter');
  const storedPage = localStorage.getItem('currentPage');

  if (storedSearchTxt && storedSearchFilter && storedPage) {
    setSearchTxt(storedSearchTxt);
    setSearchFilter(storedSearchFilter);
    setCurrentPage(parseInt(storedPage, 10));
  } else {
    // If no data is found in localStorage, reset the state
    setSearchTxt('');
    setSearchFilter('title'); // Set your default filter here
    setCurrentPage(1);
  }
}, []);


  const fetchTotalCount = async () => {
    const totalEndpoint = `${url}/posts/?${searchFilter}=${searchTxt}`;
    try {
      const totalResponse = await fetch(totalEndpoint, {
        method: 'GET',
      });
      const totalJson = await totalResponse.json();
      setTotalCount(totalJson.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    const endpoint = `${url}/posts/?${searchFilter}=${searchTxt}&offset=${offset}&limit=${itemsPerPage}`;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
      });
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTotalCount();
  }, [searchTxt, searchFilter]);

  useEffect(() => {
    fetchData();
    // Update the URL with the current page, search text, and filter
    const queryParams = new URLSearchParams({
      page: currentPage,
      search: searchTxt,
      filter: searchFilter,
    });
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Save state to localStorage
    localStorage.setItem('searchTxt', searchTxt);
    localStorage.setItem('searchFilter', searchFilter);
    localStorage.setItem('currentPage', currentPage);
  }, [searchTxt, currentPage, searchFilter]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTxt(inputValue);
      setCurrentPage(1); // Reset page when changing search text
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setCurrentPage(1); // Reset page when changing search text
  };

  return (
      <div className="Search" style={{color: 'black', textAlign: 'center'}}>
        <form style={{display: 'inline-block'}} onSubmit={handleFormSubmit}>
          <label htmlFor="search-txt">Search:</label>
          <input
              type="search"
              id="search-txt"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={{position: 'static', marginTop: '50px'}}
          />
          <select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
            <option value="title">Title</option>
            <option value="musician">Musician</option>
          </select>
        </form>
        <ul className="list-group">
          {data &&
              data.map((e) => (
                  <li key={e.id} className="list-group-item" style={{color: 'black'}}>
                    <div className="card">
                      <p className="card-title" style={{color: 'darkred'}}>
                        {e.title} - {e.musician}
                      </p>
                    </div>
                  </li>
              ))}
        </ul>
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
          Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
        </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= totalCount}>
            Next
          </button>
        </div>
      </div>
  );
}

export default SearchPage;
