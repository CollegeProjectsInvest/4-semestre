import { StyleSheet, View } from "react-native";

import { Typography } from "./typography";

export function Divider({ text }) {
    return (
        <View style={styles.divider}>
            <View style={styles.line} />
            <Typography>{text}</Typography>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    line: {
        backgroundColor: "#ABABAB",
        width: "40%",
        height: 2
    },
})
