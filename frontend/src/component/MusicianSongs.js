import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const MusicianSongs = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/song/musician/${id}/`)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching musician songs: ", error);
      });
  }, [id]);

  const handlePlayPause = (song) => {
    if (currentSong === song) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      setSong(song);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
  };

  const setSong = (song) => {
    setCurrentSong(song);
    audioRef.current.src = song.audio;
    audioRef.current.volume = volume;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const navigateToMusicianPage = () => {
    navigate(`/`);
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <label htmlFor="volume" style={{ marginBottom: "10px" }}>
        Громкость
      </label>
      <input
        type="range"
        id="volume"
        value={volume}
        step="0.1"
        min="0"
        max="1"
        onChange={handleVolumeChange}
        style={{ width: "300px", marginBottom: "20px" }}
      />
      <div className="d-flex flex-wrap">
        {songs.map((song) => (
          <Card
            key={song.id}
            className="m-3"
            style={{
              backgroundColor: "#710808",
              color: "whitesmoke",
              maxWidth: "300px",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Img variant="top" src={song.cover} alt={song.title} />
            <Card.Body>
              <Card.Title>{song.title}</Card.Title>
              <audio ref={audioRef} />
              <Button onClick={() => handlePlayPause(song)}>
                {currentSong === song && isPlaying ? "Pause" : "Play"}
              </Button>
              <Button onClick={handleRestart}>Restart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
        <img
          src="https://usagif.com/wp-content/uploads/2020/b72nv6/evrbddancen0w-16.gif"
          alt="Loading..."
          style={{
            position: "static",
            width: "50%",
            height: "50%",
          }}
        />
      {/* Button to navigate to musician page */}
      <Button onClick={navigateToMusicianPage} style={{ marginTop: "20px" }}>
        Go Back
      </Button>
    </div>
  );
};

export default MusicianSongs;
