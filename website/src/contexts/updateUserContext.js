import { createContext, useState } from 'react'

export const UpdateUserContext = createContext();

export const UpdateUserContextProvider = (props) => {

    const [updateUserInfo, setUpdateUserInfo] = useState({
        username: "",
        email:"",
        password: "",
        id: ""
    })

    return (
        <UpdateUserContext.Provider value={[updateUserInfo, setUpdateUserInfo]}>
            {props.children}
        </UpdateUserContext.Provider>
    )

}