import * as React from 'react';
import { Snackbar, Portal, Icon, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { setMessage } from '@/redux/slices/AuthSlice';
import { RootState, AppDispatch } from '@/redux/store/store';
import { globalStyles } from '@/utils/globalStyles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SCText from './CustomText';
import { IconButton } from '@/utils/Icons';
import { TSnackbarVariant } from '@/types';
const SnackBar = () => {
    // const [visibleMessage, setVisible] = React.useState(false);
    // const { message, messageStatus, snackbarVariant } = useSelector((state: RootState) => state.auth);

    const { message, visible, variant } = useSelector(
        (state: RootState) => state.snackbar
    );
    const dispatch = useDispatch<AppDispatch>()

    // React.useEffect(() => {
    //     if (messageStatus) {
    //         setVisible(true);
    //     } else {
    //         setVisible(false);
    //     }
    // }, [messageStatus]);

    const snackbarVariant = variant;

    return (
        <>
            {visible && <SafeAreaView style={{ position: 'absolute', width: '100%', zIndex: 4, bottom: 30 }}>
                <Snackbar
                    elevation={1}
                    style={{ borderRadius: 8, borderWidth: 0.8, backgroundColor: '#fffff', borderColor: snackbarVariant === 'success' ? COLORS.lightBlue : snackbarVariant === 'error' ? COLORS.redColor : snackbarVariant === 'warning' ? '#FF8F28' : COLORS.lightBlue }}
                    visible={visible}
                    onDismiss={() => dispatch(setMessage({ message: '', messageStatus: false, snackbarVariant: 'success' }))}
                >
                    {/* <View style={[globalStyles.rowBetweeen]}>
                        <View style={{ ...globalStyles.rowCenterBetween }}>
                            <Icon name={snackbarVariant === 'success' ? 'snackSuccess' : snackbarVariant === 'error' ? 'snackError' : snackbarVariant === 'warning' ? 'snackWarning' : 'snackInfo'} color='transparent' />
                            <SCText numberOfLines={2} style={{ marginLeft: 10, }}>{formatFileName(message, 80) || 'This is Testing Message'}</SCText>
                        </View>

                        <IconButton
                            style={{ alignSelf: 'flex-end' }}
                            name='closeBalck'
                            size={20}
                            onPress={() => {
                                dispatch(setMessage({ message: '', messageStatus: false, snackbarVariant: 'success' }))
                            }}
                        >

                        </IconButton>
                    </View> */}
                    <View style={{ ...globalStyles.row, alignItems: 'center' }}>

                        <View style={{ flex: 1, ...globalStyles.row, alignItems: 'center' }}>
                            <Icon
                                name={snackbarVariant === 'success' ? 'snackSuccess' : snackbarVariant === 'error' ? 'snackError' : snackbarVariant === 'warning' ? 'snackWarning' : 'snackInfo'}
                                color="transparent"
                            />

                            <SCText numberOfLines={2} ellipsizeMode='tail' size={12} style={{
                                marginLeft: 5,
                                flex: 1,
                            }}
                            >
                                {message}
                            </SCText>
                        </View>


                        <IconButton name="closeBalck" size={20} onPress={() => dispatch(setMessage({ message: '', messageStatus: false, snackbarVariant: 'success', }))}
                        />
                    </View>
                </Snackbar>
            </SafeAreaView>}
        </>
    );
}

export default SnackBar