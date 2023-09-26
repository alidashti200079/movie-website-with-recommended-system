import react, {useState, createContext } from 'react'

export const SerieContext = createContext();

export const SerieProvider =  (props) => {
    const [series, setSeries] = useState({ "data" : []});

    return(
        <SerieContext.Provider value={[series, setSeries]}>
            {props.children}
        </SerieContext.Provider>
    );
}