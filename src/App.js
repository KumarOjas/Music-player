import React, { useState, useRef } from "react";

// Music Player Component
function MusicPlayer() {
  const [songs] = useState([
    { title: "Song 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Song 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Song 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the song if it is playing
    } else {
      audioRef.current.play(); // Play the song if it is paused
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  const skipHandler = (direction) => {
    let newIndex = currentSongIndex + direction;
    if (newIndex < 0) newIndex = songs.length - 1; // Go to the last song if going back
    if (newIndex >= songs.length) newIndex = 0; // Go to the first song if going forward
    setCurrentSongIndex(newIndex);
    setIsPlaying(false); // Reset to pause on skip
  };

  const onEndedHandler = () => {
    skipHandler(1); // Auto-play the next song when the current one ends
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>React Music Player</h1>
      <h2>Now Playing: {songs[currentSongIndex].title}</h2>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onEnded={onEndedHandler}
        preload="auto"
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => skipHandler(-1)} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <button onClick={playPauseHandler} style={{ marginRight: "10px" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={() => skipHandler(1)}>Next</button>
      </div>
    </div>
  );
}

// App Component
function App() {
  return (
    <div>
      <MusicPlayer />
    </div>
  );
}

export default App;
