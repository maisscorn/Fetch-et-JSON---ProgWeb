import { getNode, getNodes, cloneTemplate, forEach, on } from './utils/dom.js';
import { loadJson, loadJsonUrls } from './utils/fetch.js';

const FILMS_URL = 'https://swapi.dev/api/films/';

const moviesContainer = getNode('#movies');
const planetUrlsByMovie = new Map();

function createMovieNode(movie) {
    const node = cloneTemplate('#movie-template');
    node.dataset.movieId = movie.episode_id;
    getNode('.movie-episode', node).textContent = movie.episode_id;
    getNode('.movie-name', node).textContent = movie.title;
    planetUrlsByMovie.set(String(movie.episode_id), movie.planets);
    return node;
}

async function loadMovies() {
    const data = await loadJson(FILMS_URL);
    const movies = data.results;
    movies.sort((a, b) => a.episode_id - b.episode_id);
    moviesContainer.append(...movies.map(createMovieNode));
}

loadMovies();