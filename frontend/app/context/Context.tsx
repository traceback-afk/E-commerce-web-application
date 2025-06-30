"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for the context
interface ContextType {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

const WebContext = createContext<ContextType | undefined>(undefined);

export const WebProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);

    // Check if the token is in localStorage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []); // Empty dependency array to run only once on mount

    return (
        <WebContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </WebContext.Provider>
    );
};

export const useWebContext = () => {
    const context = useContext(WebContext);
    if (!context) {
        throw new Error("useWebContext must be used within a WebProvider");
    }
    return context;
};