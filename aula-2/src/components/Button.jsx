import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Typography } from "./Typography";

export function Button(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Typography variant="button">{props.text}</Typography>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#BB86FC",
        padding: 20,
        borderRadius: 10,
        width: '100%',
    }
})