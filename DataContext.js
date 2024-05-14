import React, {createContext, useState} from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [runde, setRunde] = useState([]);

    const dodajRundu = (novaRunda) => {
        setRunde((runde) => [...runde, novaRunda]);
    };


    return (
        <DataContext.Provider value={{runde, dodajRundu, setRunde}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;