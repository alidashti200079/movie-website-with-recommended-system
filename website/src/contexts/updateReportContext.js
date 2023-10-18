import { createContext, useState } from 'react'

export const UpdateReportContext = createContext();

export const UpdateReportContextProvider = (props) => {

    const [updateReportInfo, setUpdateReportInfo] = useState({
        user_id: "",
        comment:"",
        id: ""
    })

    return (
        <UpdateReportContext.Provider value={[updateReportInfo, setUpdateReportInfo]}>
            {props.children}
        </UpdateReportContext.Provider>
    )

}