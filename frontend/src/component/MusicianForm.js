// MusicianForm.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const MusicianForm = ({ showModal, handleClose }) => {
    const token = localStorage.getItem("authTokens");

  const [formData, setFormData] = useState({
    nickname: "",
    photo: '',
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("nickname", formData.nickname);
    formDataToSend.append("photo", formData.photo);
    formDataToSend.append("bio", formData.bio);

try {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await axios.post("api/musician/", formDataToSend, config);
  setIsLoading(false);
  handleClose();
} catch (error) {
  setIsLoading(false);
  console.error("Error creating musician: ", error);
}

  };

  return (
      <div>
      {
        token ? (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton style={{ backgroundColor: '#8B0000', color: 'white' }}>
        <Modal.Title>Add Musician</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#333', color: 'white' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname" style={{ color: 'white' }}>
            Nickname:
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="form-control"
          />

          <label htmlFor="photo" style={{ color: 'white' }}>
            Photo:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />

          <label htmlFor="bio" style={{ color: 'white' }}>
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control"
          />

          <Button type="submit" style={{ backgroundColor: '#8B0000', borderColor: '#8B0000' }}>
            Add Musician
          </Button>
        </form>
      </Modal.Body>
    </Modal>
        ) : (
            <span className="error-message">Извините, мы вас не знаем.</span>
        )
      }
      </div>
  );
};

export default MusicianForm;
