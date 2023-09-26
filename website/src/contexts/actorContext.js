import react, {useState, createContext } from 'react'

export const ActorContext = createContext();

export const ActorProvider =  (props) => {
    const [actors, setActors] = useState({ "data" : []});

    return(
        <ActorContext.Provider value={[actors, setActors]}>
            {props.children}
        </ActorContext.Provider>
    );
}