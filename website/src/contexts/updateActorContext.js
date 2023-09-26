import { createContext, useState } from 'react'

export const UpdateActorContext = createContext();

export const UpdateActorContextProvider = (props) => {

    const [updateActorContext, setUpdateActorContext] = useState({
        name: "",
        image:"",
        description: "",
        id: ""
    })

    return (
        <UpdateActorContext.Provider value={[updateActorContext, setUpdateActorContext]}>
            {props.children}
        </UpdateActorContext.Provider>
    )

}