import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false); 
	const [alertType, setAlertType] = useState(false); 

    const value = { 
        showAlertState: [showAlert, setShowAlert], 
        alertMessageState: [alertMessage, setAlertMessage],
        alertTypeState : [alertType, setAlertType]
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};