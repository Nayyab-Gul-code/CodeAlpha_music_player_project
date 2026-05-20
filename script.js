const songs = [
  {
    title: "Dream Escape",
    artist: "Neon Waves",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Midnight City",
    artist: "Aurora Sky",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Ocean Lights",
    artist: "Blue Horizon",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Generated Audio May 09, 2026",
    artist: "Local",
    src: "audio/Generated Audio May 09, 2026 - 5_26PM.wav",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(song){
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  updatePlaylist();
}

function playSong(){
  isPlaying = true;
  audio.play();
  playBtn.innerText = "⏸";
}

function pauseSong(){
  isPlaying = false;
  audio.pause();
  playBtn.innerText = "▶";
}

playBtn.addEventListener("click", () => {
  if(isPlaying){
    pauseSong();
  }else{
    playSong();
  }
});

function nextSong(){
  songIndex++;
  if(songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e){
  const {duration, currentTime} = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if(durationSeconds < 10){
    durationSeconds = `0${durationSeconds}`;
  }

  if(durationSeconds){
    durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
  }

  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if(currentSeconds < 10){
    currentSeconds = `0${currentSeconds}`;
  }

  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
}

progressContainer.addEventListener("click", setProgress);

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);


function createPlaylist(){
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = `${song.title} — ${song.artist}`;

    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlist.appendChild(li);
  });
}

function updatePlaylist(){
  const items = playlist.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}

createPlaylist();
loadSong(songs[songIndex]);
