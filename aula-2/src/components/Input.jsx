import { TextInput, StyleSheet } from "react-native";

export function Input(props) {
    return (
        <TextInput
            placeholderTextColor={"#fff"}
            style={styles.input}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#1A1A1A",
        width: '100%',
        padding: 20,
        borderRadius: 10,
        color: '#fff',
        fontSize: 28
    },
})