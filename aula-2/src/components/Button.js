import { StyleSheet, Text } from 'react-native'

export function Button() {
    return (
        <Text style={styles.texto}>Botão</Text>
    )
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 30
    }
})