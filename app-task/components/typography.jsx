import { StyleSheet, Text } from "react-native";

export function Typography({ variant = "default", children }) {
    return (
        <Text style={styles[variant]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    default: {
        color: "#ABABAB",
        fontSize: 16,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    subtitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    },
    link: {
        color: "#ABABAB",
        fontSize: 18,
        textDecorationLine: "underline"
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center"
    }
});
