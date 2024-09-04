import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from './src/components/Button'

// // Componente Button
// function Button(props) {
//   // JSX => Javascript + XML, sintaxe do React
//   return (
//     <Text
//       style={{
//         fontSize: 30,
//         color: props.color
//       }}
//     >
//       {props.texto}
//     </Text>
//   );
// }

// function CapsLock(props) {
//   return (<Text>{props.children}</Text>)
// }

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <Button texto="Olá" color="green" />
//       <Button texto="Mundo" color="white" />
//       <Button texto="Bem-vindo!" color="yellow" />
//       <CapsLock>Olá</CapsLock>
//     </View>
//   );
// }

export default function App() {
  const [contador, setContador] = useState(0)

  const contar = () => {
    setContador(contador + 1)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá</Text>
      <Text style={styles.button}>Mundo!</Text>
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  texto: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000"
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    fontSize: 30,
    color: "white",
    margin: 30
  }
});
