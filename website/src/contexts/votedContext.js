import {useState, createContext } from 'react'

export const VotedContext = createContext();

export const VoteProvider =  (props) => {
    const [votes, setVotes] = useState({ "data" : []});

    return(
        <VotedContext.Provider value={[votes, setVotes]}>
            {props.children}
        </VotedContext.Provider>
    );
}