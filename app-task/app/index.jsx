import { Redirect } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AuthContext } from "../contexts/auth-context";
import { Container } from '../components/container';
import { Typography } from "../components/typography";

export default function App() {
    const { loading, isAuthenticated, logout } = useContext(AuthContext);

    if (loading) {
        return (
            <Container style={{ justifyContent: "center" }}>
                <ActivityIndicator color={"#BB86FC"} size={"large"} />
            </Container>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href={"/login"} />;
    }

    return (
        <Container>
            <MaterialIcons
                name="logout"
                size={30}
                color="#ABABAB"
                onPress={logout}
                style={{ alignSelf: "flex-end", marginBottom: 20 }}
            />
            <Typography variant="title">Crie e organize as suas tarefas.</Typography>
            {/* TODO: implementar lista de tarefas */}
        </Container>
    );
}
