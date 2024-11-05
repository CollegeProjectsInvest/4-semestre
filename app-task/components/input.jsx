import { StyleSheet, TextInput } from "react-native";

export function Input(props) {
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor={"#ABABAB"}
            autoCapitalize="none"
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#222222",
        color: "#FFFFFF",
        width: "100%",
        padding: 20,
        fontSize: 20,
        borderRadius: 10
    },
});
