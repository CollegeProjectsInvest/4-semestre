import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    return (
        <UserContext.Provider value={{ username: "Teste Username" }}>
            {children}
        </UserContext.Provider>
    )
}