export let tracks = [];

export async function fetchTrackList() {
  try {
    const response = await fetch('assets/trackslist.json');
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    tracks = await response.json();
    console.log(tracks);
  } catch (error) {
    console.error("Erreur lors du chargement des pistes :", error.message);
  }
}