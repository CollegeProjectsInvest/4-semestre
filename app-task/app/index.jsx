import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AuthContext } from "../contexts/auth-context";
import { Container } from '../components/container';
import { Typography } from "../components/typography";
import { TasksContext } from "../contexts/tasks-context";
import { Input } from "../components/input";
import { Button } from "../components/button";
import Checkbox from "expo-checkbox";

export default function App() {
    const { loading: authLoading, isAuthenticated, logout } = useContext(AuthContext);
    const { tasks, loading: tasksLoading, listAllTasks, createTask, updateTask, deleteTask } = useContext(TasksContext);

    const [title, setTitle] = useState("");

    useEffect(() => {
        listAllTasks();
    }, []);

    if (authLoading || tasksLoading) {
        return (
            <Container style={{ justifyContent: "center" }}>
                <ActivityIndicator color={"#BB86FC"} size={"large"} />
            </Container>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href={"/login"} />;
    }

    return (
        <Container>
            <MaterialIcons
                name="logout"
                size={30}
                color="#ABABAB"
                onPress={logout}
                style={{ alignSelf: "flex-end", marginBottom: 20 }}
            />
            <Typography variant="title">Crie e organize as suas tarefas.</Typography>
            <FlatList
                data={tasks}
                style={styles.listTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 6 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.task}>
                        <Checkbox
                            value={item.finished}
                            style={styles.checkbox}
                            color={item.finished ? "#BB86FC" : "#ABABAB"}
                            onValueChange={async () => await updateTask({ id: item.id, finished: !item.finished })}
                        />
                        <Typography variant="default2">
                            {item.title}
                        </Typography>
                        <MaterialIcons
                            name="delete-outline"
                            color={"red"}
                            size={26}
                            onPress={async () => await deleteTask({ id: item.id })}
                        />
                    </View>
                )}
            />
            <View style={styles.form}>
                <Input
                    type="text"
                    placeholder="Insira o título da tarefa"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <Button
                    title="Adicionar"
                    onPress={async () => {
                        await createTask({ title });
                        setTitle("");
                    }}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    listTasks: {
        flex: 1,
        width: "100%",
        marginVertical: 15,
    },
    task: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 14,
        borderRadius: 8,
        backgroundColor: "#1A1A1A",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4
    },
    form: {
        paddingVertical: 4,
        width: "100%",
        gap: 4,
    }
})
