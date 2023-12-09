// SongForm.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const SongForm = ({ showModal, handleClose }) => {
  const token = localStorage.getItem("authTokens");

  const [formData, setFormData] = useState({
    title: "",
    audio: null,
    cover: null,
  });
  const [musicians, setMusicians] = useState([]);
  const [selectedMusician, setSelectedMusician] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const response = await axios.get("api/musician/");
        setMusicians(response.data);
      } catch (error) {
        console.error("Error fetching musicians: ", error);
      }
    };

    fetchMusicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleMusicianChange = (e) => {
    const musicianId = e.target.value;
    setSelectedMusician(musicianId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("audio", formData.audio);
    formDataToSend.append("cover", formData.cover);
    formDataToSend.append("musician", selectedMusician);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("api/song/", formDataToSend, config);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating song: ", error);
    }
  };

  return (
    <div>
      {token ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton style={{ backgroundColor: '#8B0000', color: 'white' }}>
            <Modal.Title>Add Song</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#333', color: 'white' }}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title" style={{ color: 'white' }}>
                Title:
              </label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                className="form-control" />
              <label htmlFor="audio" style={{ color: 'white' }}>
                Audio:
              </label>
              <input
                type="file"
                id="audio"
                name="audio"
                accept="audio/*"
                onChange={handleFileChange}
                className="form-control"
              />

              <label htmlFor="cover" style={{ color: 'white' }}>
                Cover:
              </label>
              <input
                type="file"
                id="cover"
                name="cover"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
              />

              {/* Dropdown for selecting musician */}
              <label htmlFor="musician" style={{ color: 'white' }}>
                Musician:
              </label>
              <select
                id="musician"
                name="musician"
                value={selectedMusician}
                onChange={handleMusicianChange}
                className="form-control"
              >
                <option value="" disabled>
                  Select Musician
                </option>
                {musicians.map((musician) => (
                  <option key={musician.id} value={musician.id}>
                    {musician.nickname}
                  </option>
                ))}
              </select>

              <Button type="submit" style={{ backgroundColor: '#8B0000', borderColor: '#8B0000' }}>
                Add Song
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      ) : (
        <span className="error-message">Вы кто такие???? Я вас не звал!!!!</span>
      )}
    </div>
  );
};

export default SongForm;
