import {useState, createContext } from 'react'

export const ReportContext = createContext();

export const ReportProvider =  (props) => {
    const [reports, setReports] = useState({ "data" : []});

    return(
        <ReportContext.Provider value={[reports, setReports]}>
            {props.children}
        </ReportContext.Provider>
    );
}