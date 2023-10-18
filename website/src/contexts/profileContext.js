import {useState, createContext } from 'react'

export const ProfileContext = createContext();

export const ProfileProvider =  (props) => {
    const [movies, setMovies] = useState({ "data" : []});

    return(
        <ProfileContext.Provider value={[movies, setMovies]}>
            {props.children}
        </ProfileContext.Provider>
    );
}