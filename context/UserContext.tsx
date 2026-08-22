"use client"

import { LoggedInUser } from "@/features/auth/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
    user: LoggedInUser | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>
}

const UserContext = createContext<UserContextType | undefined> (undefined)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<LoggedInUser | null>(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useLoggedInUser = () => {
    const context = useContext(UserContext);
    
    if (!context) {
      throw new Error("useUser must be used within UserProvider");
    }

    return context;
}