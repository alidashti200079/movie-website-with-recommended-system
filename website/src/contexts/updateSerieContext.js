import { createContext, useState } from 'react'

export const UpdateSerieContext = createContext();

export const UpdateSerieContextProvider = (props) => {

    const [updateSerieInfo, setUpdateSerieInfo] = useState({
        name: "",
        image:"",
        description: "",
        genre: "",
        rating: 0,
        id: ""
    })

    return (
        <UpdateSerieContext.Provider value={[updateSerieInfo, setUpdateSerieInfo]}>
            {props.children}
        </UpdateSerieContext.Provider>
    )

}