import axiosInstance from "./axios.js";
import { routes } from "./routes.js";

export const checkUserLogin = (body) => {
  return axiosInstance({
    method: routes.LOGIN.METHOD,
    url: routes.LOGIN.URL,
    data: body,
  });
};

export const checkUserRegister = (body) => {
    return axiosInstance({
        method:routes.REGISTER.METHOD,
        url:routes.REGISTER.URL,
        data:body,
    });
}

export const getMovie = (page=1, limit=10) => {
    return axiosInstance({
        method:routes.GETMOVIE.METHOD,
        url:routes.GETMOVIE.URL,
        params:{
            page,
            limit
        }
    })
}

export const sortedMovie = (sortBy="rating",order="asc") => {
    return axiosInstance({
        method:routes.SORTEDMOVIE.METHOD,
        url:routes.SORTEDMOVIE.URL,
        params:{
            sortBy,
            order
        }
    })
}

export const searchMovie = (query = "") => {
    return axiosInstance({
       method:routes.SEARCHMOVIE.METHOD,
        url:routes.SEARCHMOVIE.URL,
        params:{
            query
        }
    })
}
//ADMIN ROUTES
export const addMovie = (body) => {
    return axiosInstance({
        method:routes.ADDMOVIE.METHOD,
        url:routes.ADDMOVIE.URL,
        data:body,
    })
}

export const updateMovie = (body,id) =>{
    return axiosInstance({
        method:routes.EDITMOVIE.METHOD,
        url:`${routes.EDITMOVIE.URL}/${id}`,
        data:body
    })
}

export const deleteMovie = (id) => {
    return axiosInstance({
        method:routes.DELETEMOVIE.METHOD,
        url:`${routes.DELETEMOVIE.URL}/${id}`,
    })
}