import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox';
import Feather from '@expo/vector-icons/Feather'

let id = 0;

export default function App() {
    const [title, setTitle] = useState("")
    const [tasks, setTasks] = useState([]);

    const handleCreateTask = () => {
        const newTasks = [...tasks, {
            id,
            title,
            isFinished: false,
        }]

        id++;

        setTasks(newTasks);
        setTitle("");
    }

    const handleCheckTask = (id) => {
        const newTasks = tasks.map((item) => {
            if (item.id === id) {
                item.isFinished = !item.isFinished;
            }

            return item;
        });

        setTasks(newTasks);
    }

    const handleDeleteTask = (id) => {
        const newTasks = tasks.filter(
            item => item.id !== id
        );
        setTasks(newTasks);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safearea}>
                <StatusBar style="light" />
                <View style={styles.container}>
                    <Text style={styles.title}>Crie e organize as suas tarefas.</Text>
                    <FlatList
                        data={tasks}
                        style={styles.listTasks}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                        renderItem={({ item }) => (
                            <View style={styles.cardTask}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={item.isFinished}
                                    color={item.isFinished ? "#BB86FC" : "#FFFFFF"}
                                    onValueChange={() => handleCheckTask(item.id)}
                                />
                                <Text style={styles.text} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Feather
                                    name="trash-2"
                                    size={25}
                                    color={"red"}
                                    onPress={() => handleDeleteTask(item.id)}
                                />
                            </View>
                        )}
                    />
                    <View style={styles.form}>
                        <View style={styles.line} />
                        <TextInput
                            style={styles.input}
                            placeholder="Insira o nome da tarefa"
                            placeholderTextColor={"#ABABAB"}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
                            <Text style={styles.textButton}>
                                Adicionar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: "#141414",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        color: "#fff",
        fontSize: 30,
        textAlign: 'center',
        width: '70%',
    },
    form: {
        width: "100%",
        gap: 10,
    },
    input: {
        backgroundColor: "#222222",
        color: "#fff",
        width: '100%',
        padding: 20,
        fontSize: 20,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#BB86FC",
        padding: 20,
        width: "100%",
        borderRadius: 10
    },
    textButton: {
        color: "#fff",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    line: {
        width: "100%",
        backgroundColor: "#222222",
        height: 2,
    },
    listTasks: {
        flex: 1,
        width: "100%",
        marginVertical: 10,
    },
    cardTask: {
        backgroundColor: "#222222",
        padding: 25,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: "#FFFFFF",
        fontSize: 20,
        width: "70%"
    },
    checkbox: {
        borderRadius: 5,
        width: 25,
        height: 25
    }
});
