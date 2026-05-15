import { View, ViewStyle } from "react-native";

export const Divider = ({ style }: { style?: ViewStyle }) => {

    return (
        <View style={[{
            height: 1,
            width: '100%',
            backgroundColor: '#e0e0e0',
            marginHorizontal: 10
        }, style]}>
        </View>
    )

};
