import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
})

export default function App() {
  const [endereco, setEndereco] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title='Consultar via Fetch'
        onPress={async () => {
          // consumir a API via AXIOS
          try {
            const { data } = await api.get("7808800/json/");
            setEndereco(data);
            console.log(data);
          } catch (error) {
            console.error(error);
          }

          // consumir a API via Fetch
          // try {
          //   const response = await fetch("https://viacep.com.br/ws/7808800/json/", {
          //     method: "GET",
          //     headers: {
          //       "Content-Type": "application/json"
          //     }
          //   });
          //   const data = await response.json();

          //   if (!response.ok) {
          //     throw new Error(data);
          //   }

          //   setEndereco(data);
          //   console.log(data);
          // } catch (error) {
          //   console.error(error);
          // }
        }}
      />
      {endereco && (
        <Text>{endereco.logradouro}</Text>
      )}
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
