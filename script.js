const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs = [
    {
        name: "music1",
        title: "Lotus Lane",
        artist: "The Loyalist",
    },
    {
        name: "music2",
        title: "sappheiros",
        artist: "Aurora",
    },
    {
        name: "music3",
        title: "walking firiri",
        artist: "Gorkhali Takna",
    }
]

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

// changing music data
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `images/${songs.name}.jpg`;
};

let songIndex = 0;
// loadSong(songs[1]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    progress.style.width = "0%";
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// progress js work

music.addEventListener("timeupdate", (event) => {
    // console.log(event);
    const { currentTime, duration } = event.target;

    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update
    let minute_duration = Math.floor(duration / 60);
    if (minute_duration < 10) {
        minute_duration = `0${minute_duration}`;
    }
    let second_duration = Math.floor(duration % 60);
    if (second_duration < 10) {
        second_duration = `0${second_duration}`;
    }

    let tot_duration = `${minute_duration}:${second_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // current duration update
    let minute_currentTime = Math.floor(currentTime / 60);
    if (minute_currentTime < 10) {
        minute_currentTime = `0${minute_currentTime}`;
    }

    let second_currentTime = Math.floor(currentTime % 60);
    if (second_currentTime < 10) {
        second_currentTime = `0${second_currentTime}`;
    }

    let tot_currentTime = `${minute_currentTime}:${second_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
});

// progress onclick functionality
progress_div.addEventListener("click", (event) => {
    const { duration } = music;

    let move_progress = (event.offsetX / event.target.clientWidth) * duration;
    music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);