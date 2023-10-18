import {useState, createContext } from 'react'

export const TransactionContext = createContext();

export const TransactionProvider =  (props) => {
    const [transactions, setTransactions] = useState({ "data" : []});

    return(
        <TransactionContext.Provider value={[transactions, setTransactions]}>
            {props.children}
        </TransactionContext.Provider>
    );
}