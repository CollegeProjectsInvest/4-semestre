import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Typography } from "./typography";

export function Button({ variant = "default", href = "/", title, onPress, loading }) {
    if (variant === "link") {
        return (
            <Link href={href} asChild>
                <Pressable>
                    <Typography variant="link">{title}</Typography>
                </Pressable>
            </Link>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: loading ? "#ABABAB" : "#BB86FC" }]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={"#FFFFFF"} size={28} />
            ) : (
                <Typography variant="title">
                    {title}
                </Typography>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 10,
    },
});
