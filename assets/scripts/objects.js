const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');


  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  const filterMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

  filterMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info } = movie;
    // const {title: movieTitle} = info;
    let {getFormattedTitle} = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);

    let text = getFormattedTitle.call(movie) + ' - ';
    for (const key in info) {
      if (key !== 'title') {
        text += `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};


// run on add movie btn clicked
const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
    return;
  }
  const newMovie = {
    info: {
      title, // this will assign the value of the title to title property automatically
      [extraName]: extraValue
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };
  movies.push(newMovie);
  renderMovies();
};


const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};


addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);