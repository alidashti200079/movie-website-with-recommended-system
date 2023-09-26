import { createContext, useState } from 'react'

export const UpdateMovieContext = createContext();

export const UpdateMovieContextProvider = (props) => {

    const [updateMovieInfo, setUpdateMovieInfo] = useState({
        name: "",
        image:"",
        description: "",
        genre: "",
        rating: 0,
        id: ""
    })

    return (
        <UpdateMovieContext.Provider value={[updateMovieInfo, setUpdateMovieInfo]}>
            {props.children}
        </UpdateMovieContext.Provider>
    )

}