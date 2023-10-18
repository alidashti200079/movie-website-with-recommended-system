import {useState, createContext } from 'react'

export const ConnectedDeviceContext = createContext();

export const DeviceProvider =  (props) => {
    const [devices, setDevices] = useState({ "data" : []});

    return(
        <ConnectedDeviceContext.Provider value={[devices, setDevices]}>
            {props.children}
        </ConnectedDeviceContext.Provider>
    );
}