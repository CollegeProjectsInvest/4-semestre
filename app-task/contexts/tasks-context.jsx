import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '../libs/api';
import { TOKEN_KEY } from '../libs/async-storage';

export const TasksContext = createContext({});

export function TasksContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const listAllTasks = async () => {
        setLoading(true);

        try {
            const accessToken = await AsyncStorage.getItem(TOKEN_KEY);

            if (!accessToken) {
                setError("Não autorizado!")
                return;
            }

            const response = await fetch(API_URL + "/task/list-all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setTasks(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async ({ title }) => {
        setLoading(true);

        try {
            const accessToken = await AsyncStorage.getItem(TOKEN_KEY);

            if (!accessToken) {
                setError("Não autorizado!");
                return;
            };

            const response = await fetch(API_URL + "/task/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({ title })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setTasks([...tasks, data]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async ({ id, finished }) => {
        setLoading(true);

        try {
            const accessToken = await AsyncStorage.getItem(TOKEN_KEY);

            if (!accessToken) {
                setError("Não autorizado!");
                return;
            };

            const response = await fetch(API_URL + "/task/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({ id, finished })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            await listAllTasks();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async ({ id }) => {
        setLoading(true);

        try {
            const accessToken = await AsyncStorage.getItem(TOKEN_KEY);

            if (!accessToken) {
                setError("Não autorizado!");
                return;
            };

            const response = await fetch(API_URL + "/task/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            await listAllTasks();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, loading, error, listAllTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
}
