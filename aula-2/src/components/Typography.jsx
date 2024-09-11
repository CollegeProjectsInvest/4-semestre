import { StyleSheet, Text } from "react-native"

export function Typography(props) {
    return (
        <Text style={styles[props.variant]}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        fontSize: 28,
        textAlign: 'center',
        maxWidth: '90%'
    },
    link: {
        color: "#ABABAB",
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    button: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})