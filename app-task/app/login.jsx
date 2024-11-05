import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../components/container';
import { Typography } from '../components/typography';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { AuthContext } from '../contexts/auth-context';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, login } = useContext(AuthContext);

    return (
        <Container style={{ gap: 50 }}>
            <Typography variant={"title"}>Bem-vindo(a)!</Typography>
            <Typography variant={"subtitle"}>Entre na sua conta para acessar nossa plataforma.</Typography>
            <View style={styles.form}>
                <Input
                    keyboardType="email-address"
                    placeholder="E-mail"
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    value={email}
                />
                <Input
                    secureTextEntry
                    placeholder="Senha"
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    value={password}
                />
                <Button
                    loading={loading}
                    title={"Entrar"}
                    onPress={async () => {
                        setEmail("");
                        setPassword("");
                        await login({ email, password });
                    }}
                />
                {error && (
                    <Typography variant="error">{error}</Typography>
                )}
            </View>
            <Divider text={"Ou"} />
            <Button variant="link" href="/register" title="Crie uma conta" />
        </Container>
    );
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        gap: 10
    }
});
