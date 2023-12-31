import {useState, createContext } from 'react'

export const MovieContext = createContext();

export const MovieProvider =  (props) => {
    const [movies, setMovies] = useState({ "data" : []});

    return(
        <MovieContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MovieContext.Provider>
    );
}