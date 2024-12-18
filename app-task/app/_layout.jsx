import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import { AuthContextProvider } from "../contexts/auth-context";
import { TasksContextProvider } from "../contexts/tasks-context";

export default function AppLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <AuthContextProvider>
                <TasksContextProvider>
                    <Slot />
                </TasksContextProvider>
            </AuthContextProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    }
});
