const auth = {
  LOGIN: {
    URL: "/api/auth/login",
    METHOD: "POST",
  },
  REGISTER: {
    URL: "/api/auth/register",
    METHOD: "POST",
  },
};

const movies = {
  GETMOVIE: {
    URL: "/API/MOVIE/MOVIES",
    METHOD: "GET",
  },
  SORTEDMOVIE: {
    URL: "/API/MOVIE/MOVIES/SORTED",
    METHOD: "GET",
  },
  SEARCHMOVIE: {
    URL: "/API/MOVIE/MOVIES/SEARCH",
    METHOD: "GET",
  },
};

const admin = {
  ADDMOVIE: {
    URL: "/API/MOVIE/ADDMOVIE",
    METHOD: "POST",
  },
  EDITMOVIE:{
    URL:"/API/MOVIE/UPDATEMOVIE",
    METHOD:"PUT",
  },
  DELETEMOVIE:{
    URL:"/API/MOVIE/DELETEMOVIE",
    METHOD:"DELETE",
  }
};

export const routes = { ...auth, ...movies, ...admin };
