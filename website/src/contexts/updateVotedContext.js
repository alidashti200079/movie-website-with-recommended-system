import { createContext, useState } from 'react'

export const UpdateVotedContext = createContext();

export const UpdateVotedContextProvider = (props) => {

    const [updateVoteInfo, setUpdateVoteInfo] = useState({
        user_id: "",
        movie_id: "",
        user_rating: 0,
        id: ""
    })

    return (
        <UpdateVotedContext.Provider value={[updateVoteInfo, setUpdateVoteInfo]}>
            {props.children}
        </UpdateVotedContext.Provider>
    )

}