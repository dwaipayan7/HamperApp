import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import SCText from "./CustomText";

const NoNotificationsFound = () => {
    return (
        <View style={{ minHeight: 400, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Feather name="bell" size={80} color="#E1E8ED" />
                <SCText style={{
                    marginTop: 10
                }}>No notifications yet</SCText>
                <SCText style={{ marginTop: 5 }}>
                    When people like, comment, or follow you, you&apos;ll see it here.
                </SCText>
            </View>
        </View>
    );
};
export default NoNotificationsFound;