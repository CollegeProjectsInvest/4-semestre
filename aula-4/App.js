import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext, UserContextProvider } from './user-context';
import { useContext } from 'react';

export default function App() {
  return (
    <UserContextProvider>
      <View style={styles.container}>
        <Text>Login</Text>
        <StatusBar style="auto" />
        <Perfil />
        <EditarPerfil />
      </View>
    </UserContextProvider>
  );
}

function Perfil() {
  const { username } = useContext(UserContext);

  return (
    <Text>Nome: {username}</Text>
  );
}

function EditarPerfil() {
  const { username } = useContext(UserContext);

  return (
    <>
      <Text>Nome: {username}</Text>
      <Botao />
    </>
  )
}

function Botao() {
  const { username } = useContext(UserContext);

  return (
    <Text>Nome: {username}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
