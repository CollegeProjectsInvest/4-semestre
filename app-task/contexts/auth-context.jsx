import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";

import { API_URL } from "../libs/api";
import { TOKEN_KEY } from "../libs/async-storage";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        setIsAuthenticated(token !== null);
        setLoading(false);
    };

    const register = async ({ email, password, confirmationPassword }) => {
        try {
            setLoading(true);

            const response = await fetch(API_URL + "/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, confirmationPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            await AsyncStorage.setItem(TOKEN_KEY, data.accessToken);

            setIsAuthenticated(true);

            router.replace("/");
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        try {
            setLoading(true);

            const response = await fetch(API_URL + "/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            await AsyncStorage.setItem(TOKEN_KEY, data.accessToken);

            setIsAuthenticated(true);

            router.replace("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        router.replace("/");
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ loading, error, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
