# Music Player — Projet Audio Dynamique

Ce projet est une application web simple qui permet de lire de la musique depuis une interface interactive. Il utilise HTML, CSS et JavaScript pour le front-end, ainsi que Python pour convertir les fichiers audio.

---

## Structure du projet

```
music-player/
├── index.html                  # Page principale de l'application
├── style.css                   # Feuille de style
├── requirements.txt            # Dépendances Python nécessaires (conversion audio)
├── assets/                     # Ressources du projet
│   ├── audio/                  # Fichiers audio (en .mp3)
│   ├── covers/                 # Images des pochettes
│   ├── convert_wav_to_mp3.py   # Script de conversion .wav → .mp3
│   └── trackslist.json         # Données JSON des musiques (titre, durée, chemins, etc.)
├── scripts/                    # Code JavaScript du projet
│   ├── fetch.js                # Récupération des données depuis le JSON
│   ├── affichage.js            # Affichage dynamique et interactions
│   └── main.js                 # Fichier principal qui initialise le lecteur
```



---

## Fonctionnement

- La page **`index.html`** charge le lecteur audio avec une interface stylisée en **CSS**.
- Les données (titre, durée, fichiers audio, pochettes) sont chargées dynamiquement depuis le fichier **`assets/trackslist.json`**.
- Les scripts JavaScript sont organisés comme suit :
  - `fetch.js` : charge les informations JSON.
  - `affichage.js` : gère l'affichage des pistes, les couleurs dynamiques, la lecture audio.
  - `main.js` : centralise et lance toutes les fonctions.
- Le script Python (`convert_wav_to_mp3.py`) permet de convertir des fichiers `.wav` en `.mp3` pour alléger les ressources.

---

## Exécution

### Affichage de la page web
voici l'url de la page : 'https://larafale32.github.io/music-player/''

### Installation des dépendances Python (optionnel)
Le fichier `requirements.txt` contient les bibliothèques nécessaires si vous souhaitez :
- Modifier ou étendre les fonctionnalités avec le script Python.
- Ajouter de nouvelles musiques en `.wav` et les convertir en `.mp3`.

```bash
pip install -r requirements.txt


