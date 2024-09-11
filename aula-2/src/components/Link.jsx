import { TouchableOpacity } from "react-native";
import { Typography } from "./Typography";

export function Link(props) {
    return (
        <TouchableOpacity>
            <Typography variant="link">
                {props.text}
            </Typography>
        </TouchableOpacity>
    )
}