import * as fonction from "./fetch.js"

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause')
const titleElement = document.querySelector('.player-info h2');
const coverImage = document.querySelector('.cover img');
const trackTime = document.getElementById("duration");
const currentTimeElement = document.getElementById("current-time");
const duration = document.getElementById("duration")
const playerSection = document.querySelector('.player-section');
const progressBar = document.getElementById('progress')
const nextTunes = document.querySelector(".next-tunes")
const nextTracks = document.querySelectorAll(".next-tune")
const artist = document.querySelector(".player-info h3")

const colorThief = new ColorThief();


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export function loadTrack(index) {
    const track = fonction.tracks[index];
    audio.src = track.file;
    titleElement.textContent = track.title;
    artist.textContent = track.artist
    trackTime.textContent = track.duration;
    coverImage.crossOrigin = "anonymous"; // important pour ColorThief 
    coverImage.src = track.cover;

    // Attendre que l’image soit chargée avant d'extraire la couleur
    coverImage.addEventListener('load', function handleLoad() {
        const dominantColor = colorThief.getColor(coverImage);
        playerSection.style.backgroundColor = `rgb(${dominantColor.join(',')})`;
        coverImage.removeEventListener('load', handleLoad); // éviter les doublons
        console.log("couleur =" +  playerSection.style.backgroundColor)

        const darkerColor = dominantColor.map(c => Math.max(0, c - 15)); // éviter les valeurs < 0
        nextTunes.style.backgroundColor = `rgb(${darkerColor.join(',')})`;

        // Supprime le listener pour éviter les doublons
        coverImage.removeEventListener('load', handleLoad);

        const clearColor = dominantColor.map(c => Math.max(0, c + 15))
        const nextTunesTitle = document.querySelector(".next-tunes h1")

        nextTunesTitle.style.backgroundColor = `rgb(${clearColor.join(',')})`

       

    });
}


   export function playPauseButton() {
        playButton.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    playButton.style.display = 'none';
                    pauseButton.style.display = 'flex'
                } else {
                    audio.pause();
                    playButton.style.display = 'flex';
                    pauseButton.style.display = 'none'
                }
            })

        pauseButton.addEventListener('click', () => {
            if (audio.play) {
                audio.pause();
                playButton.style.display = 'flex'
                pauseButton.style.display = 'none'
            }
        })
   };

   export function reloadPage() {
        audio.addEventListener("loadedmetadata", () => {
            audio.currentTime = 0;
            progress.value = 0
        })
    }

    export function timeUpdate() {
          audio.addEventListener("timeupdate", () => {
         let percent = (audio.currentTime / audio.duration) * 100;

        // Mise à jour dynamique du style
        progress.style.setProperty(
            "--progress-gradient",
            `linear-gradient(to right,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0.8) ${percent}%,
                rgba(255, 255, 255, 0.2) ${percent}%,
                rgba(255, 255, 255, 0.2) 100%)`);

    })

        audio.addEventListener("timeupdate", () => {
        currentTimeElement.textContent = formatTime(audio.currentTime);
        const pourcentage = (audio.currentTime / audio.duration) * 100;
        progressBar.value = pourcentage

        let remaningTime = audio.duration - audio.currentTime

        duration.textContent = formatTime(remaningTime)

    });

       progressBar.addEventListener('input', () => {
        const nouvellePosition = (progressBar.value / 100) * audio.duration;
        audio.currentTime = nouvellePosition
    })

    }

export function changeSong(getCurrentIndex, setCurrentIndex) {
    document.getElementById("next").addEventListener('click', () => {
        let current = getCurrentIndex();
        current = (current + 1) % fonction.tracks.length;
        loadTrack(current);
        showNextTracks(current);
        setCurrentIndex(current); 
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
    });

    document.getElementById("prev").addEventListener('click', () => {
        let current = getCurrentIndex();
        current = (current - 1 + fonction.tracks.length) % fonction.tracks.length;
        loadTrack(current);
        showNextTracks(current);
        setCurrentIndex(current); 
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
    });
}

export function showNextTracks(currentIndex) {
    const nextIndices = getNextTracks(currentIndex);

    for (let i = 0; i < nextIndices.length; i++) {
        const trackIndex = nextIndices[i];
        const track = fonction.tracks[trackIndex];

        const trackElement = nextTracks[i];
        const title = trackElement.querySelector("h2");
        const img = trackElement.querySelector("img");
        const artist = trackElement.querySelector("h3")

        title.textContent = track.title;
        img.src = track.cover;
        artist.textContent = track.artist;

        trackElement.dataset.trackIndex = trackIndex;
    }
}

function getNextTracks(currentIndex) {
    const total = fonction.tracks.length;
    const next = [];

    for (let i = 1; i <= 4; i++) {
        next.push((currentIndex + i) % total);
    }

    return next;
}

export function choiceSong(getCurrentIndex, setCurrentIndex) {
    for (let i = 0; i < nextTracks.length; i++) {
        nextTracks[i].addEventListener("click", () => {
            const selectedIndex = parseInt(nextTracks[i].dataset.trackIndex);
            loadTrack(selectedIndex);
            showNextTracks(selectedIndex);
            setCurrentIndex(selectedIndex);
        });
    }
}
