import * as React from 'react';
import { Snackbar, Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { RootState, AppDispatch } from '@/redux/store/store';
import { globalStyles } from '@/utils/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import SCText from './CustomText';
import { IconButton } from '@/utils/Icons';

import { hideSnackbar } from '@/redux/slices/snackbarSlice';

const SnackBar = () => {
    const { message, visible, variant } = useSelector(
        (state: RootState) => state.snackbar
    );

    const dispatch = useDispatch<AppDispatch>();

    const snackbarVariant = variant;

    const handleClose = () => {
        dispatch(hideSnackbar());
    };

    return (
        <>
            {visible && (
                <SafeAreaView
                    style={{
                        position: 'absolute',
                        width: '100%',
                        zIndex: 999,
                        bottom: 30,
                        // paddingHorizontal: 8,
                    }}
                >
                    <Snackbar
                        elevation={1}
                        duration={3500}
                        visible={visible}
                        onDismiss={handleClose}
                        style={{
                            borderRadius: 8,
                            borderWidth: 0.8,
                            backgroundColor: '#ffffff',
                            borderColor:
                                snackbarVariant === 'success'
                                    ? COLORS.lightBlue
                                    : snackbarVariant === 'error'
                                        ? COLORS.redColor
                                        : snackbarVariant === 'warning'
                                            ? '#FF8F28'
                                            : COLORS.lightBlue,
                        }}
                    >
                        <View
                            style={{
                                ...globalStyles.row,
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    ...globalStyles.row,
                                    alignItems: 'center',
                                }}
                            >
                                <Icon
                                    name={
                                        snackbarVariant === 'success'
                                            ? 'check-circle'
                                            : snackbarVariant === 'error'
                                                ? 'close-circle'
                                                : snackbarVariant === 'warning'
                                                    ? 'alert-circle'
                                                    : 'information'
                                    }
                                    size={20}
                                    color={
                                        snackbarVariant === 'success'
                                            ? COLORS.lightBlue
                                            : snackbarVariant === 'error'
                                                ? COLORS.redColor
                                                : snackbarVariant === 'warning'
                                                    ? '#FF8F28'
                                                    : COLORS.lightBlue
                                    }
                                />

                                <SCText
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    size={12}
                                    style={{
                                        marginLeft: 8,
                                        flex: 1,
                                    }}
                                >
                                    {message}
                                </SCText>
                            </View>

                            <IconButton
                                name="closeBalck"
                                size={20}
                                onPress={handleClose}
                            />
                        </View>
                    </Snackbar>
                </SafeAreaView>
            )}
        </>
    );
};

export default SnackBar;