import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import * as ImagePicker from "expo-image-picker";

interface Props {
    show: boolean;
    close: () => void;
    onFileSelect: (files: any) => void;
}

const FileComponentModal = ({
    show,
    close,
    onFileSelect,
}: Props) => {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);

    const handleOpenCamera = async () => {
        const permission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["videos"],
            allowsEditing: false,
            quality: 0.8,
            videoMaxDuration: 60,
        });

        if (!result.canceled) {
            onFileSelect(result.assets);
            close();
        }
    };

    const handleOpenGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos"],
            allowsMultipleSelection: false,
            quality: 0.8,
        });

        if (!result.canceled) {
            onFileSelect(result.assets);
            close();
        }
    };

    return (
        <ActionSheet ref={actionSheetRef} onClose={close}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleOpenCamera}>
                    <MaterialIcons
                        name="camera-alt"
                        size={32}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOpenGallery}>
                    <MaterialIcons
                        name="photo-library"
                        size={32}
                    />
                </TouchableOpacity>
            </View>
        </ActionSheet>
    );
};

export default FileComponentModal;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
    },
});