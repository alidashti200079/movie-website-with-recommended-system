import { createContext, useState } from 'react'

export const UpdateAdminContext = createContext();

export const UpdateAdminContextProvider = (props) => {

    const [updateAdminInfo, setUpdateAdminInfo] = useState({
        username: "",
        email:"",
        password: "",
        id: ""
    })

    return (
        <UpdateAdminContext.Provider value={[updateAdminInfo, setUpdateAdminInfo]}>
            {props.children}
        </UpdateAdminContext.Provider>
    )

}