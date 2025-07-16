import * as fonction from "./fetch.js"
import * as affichage from "./afficahge.js"

let currentTrackIndex = 0;

function getCurrentIndex() {
    return currentTrackIndex;
}

function setCurrentIndex(newIndex) {
    currentTrackIndex = newIndex;
}

async function lancerScript() {
    await fonction.fetchTrackList();
    affichage.loadTrack(currentTrackIndex);
    affichage.playPauseButton();
    affichage.timeUpdate();

    // On passe les getters/setters pour gérer la variable centralisée
    affichage.changeSong(getCurrentIndex, setCurrentIndex);
    affichage.choiceSong(getCurrentIndex, setCurrentIndex);

    affichage.showNextTracks(currentTrackIndex);
    affichage.reloadPage();
}

lancerScript();


