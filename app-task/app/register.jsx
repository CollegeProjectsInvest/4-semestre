import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../components/container';
import { Typography } from '../components/typography';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { AuthContext } from '../contexts/auth-context';

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const { loading, error, register } = useContext(AuthContext);

    return (
        <Container style={{ gap: 50 }}>
            <Typography variant={"title"}>Crie uma conta</Typography>
            <Typography variant={"subtitle"}>Cadastre na plataforma e comece a criar suas tarefas</Typography>
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
                <Input
                    secureTextEntry
                    placeholder="Confirme sua senha"
                    onChangeText={(text) => {
                        setConfirmationPassword(text);
                    }}
                    value={confirmationPassword}
                />
                <Button
                    loading={loading}
                    title={"Criar"}
                    onPress={async () => {
                        setEmail("");
                        setPassword("");
                        await register({ email, password, confirmationPassword });
                    }}
                />
                {error && (
                    <Typography variant="error">{error}</Typography>
                )}
            </View>
            <Divider text={"Ou"} />
            <Button variant="link" href="/login" title="Já tenho uma conta" />
        </Container>
    );
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        gap: 10
    }
});
