import {useState, createContext } from 'react'

export const AdminContext = createContext();

export const AdminProvider =  (props) => {
    const [admins, setAdmins] = useState({ "data" : []});

    return(
        <AdminContext.Provider value={[admins, setAdmins]}>
            {props.children}
        </AdminContext.Provider>
    );
}