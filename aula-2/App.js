import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function Capslock(props) {
  // JSX (Javascript + XML) => Javascript
  return (
    <Text>{props.texto.toUpperCase()}</Text>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Capslock texto="Olá mundo!" />
      <Capslock texto="Olá" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
