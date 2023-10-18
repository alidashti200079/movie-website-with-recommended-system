import { createContext, useState } from 'react'

export const UpdateProfileContext = createContext();

export const UpdateProfileContextProvider = (props) => {

    const [updateProfileInfo, setUpdateProfileInfo] = useState({
        user_id: "",
        first_name:"",
        last_name: "",
        profile_photo: "",
        id: ""
    })

    return (
        <UpdateProfileContext.Provider value={[updateProfileInfo, setUpdateProfileInfo]}>
            {props.children}
        </UpdateProfileContext.Provider>
    )

}