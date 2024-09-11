import { View, Text, StyleSheet } from 'react-native'

export function Divider(props) {
    return (
        <View style={styles.divider}>
            <View style={styles.line} />
            {props.text &&
                <Text style={styles.text}>{props.text}</Text>
            }
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: "#ABABAB",
        width: '40%',
        height: 2,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        color: "#ABABAB",
        fontSize: 20
    },
})