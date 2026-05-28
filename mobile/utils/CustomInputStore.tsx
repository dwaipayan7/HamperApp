import React, { forwardRef, ReactNode, useState } from 'react';
import {
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
    StyleSheet,
    TouchableOpacity,
    ColorValue,
    Platform,
} from 'react-native';
import { isMobile, isTablet } from './AllContext';
import { COLORS } from '@/constants/colors';
import SCText, { font } from '@/components/CustomText';
import { globalStyles } from './globalStyles';
import { Icon } from './Icons';




interface IBasicProps {
    label?: string;
    labelStyle?: TextStyle;
    wrapperStyle?: ViewStyle;
}
interface ICCMultilineTextInput extends TextInputProps, IBasicProps, IValidationError {

}
// interface ICCMultiSelect<T> extends MultiSelectProps<T>, IBasicProps, IValidationError {
//     loading?: boolean,
//     renderSelectedData?: [],
//     onSelectedItemPress?: (item: any) => void,
//     isEditable?: boolean
// }

interface ICCTextInput extends TextInputProps, IValidationError, IBasicProps {
    ref?: React.Ref<TextInput>
}
interface IValidationError {
    error?: [string | undefined, boolean | undefined];
}
interface ICCCheckbox extends IValidationError, IBasicProps {
    onPress: () => void,
    value: boolean,
}

// interface ICCDropdown<T> extends DropdownProps<T>, IBasicProps, IValidationError {
//     loading?: boolean
// }
// interface ICCDateInput extends CalendarProps, IBasicProps, IValidationError {
//     disabled?: boolean
//     value?: string
//     onFieldPress?: () => void
//     placeholderTextColor?: ColorValue,
//     placeholder?: string
//     show: boolean,
//     close: () => void,
//     calendarTheme?: CalendarProps['theme'];
// }


interface ICCTextInput extends TextInputProps, IValidationError, IBasicProps {
    rightIcon?: ReactNode;
    labelSize?: number

}

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 140;



export const SCTextInput = forwardRef<TextInput, ICCTextInput & {
    leftIcon?: React.ReactNode;
    prefix?: string;
    radius?: number;
    extendingField?: boolean
}>((props, ref) => {
    const {
        label,
        labelStyle,
        wrapperStyle,
        style,
        error,
        editable = true,
        rightIcon,
        leftIcon,
        prefix,
        onFocus,
        onBlur,
        labelSize,
        radius,
        extendingField,
        ...rest
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [inputHeight, setInputHeight] =
        useState(MIN_HEIGHT);
    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            {label && <SCText size={labelSize || 14} style={labelStyle}>{label}</SCText>}

            <View style={[
                styles.inputContainer,
                { borderColor: isFocused ? COLORS.lightBlue : COLORS.divider2 },
                error?.[1] && styles.errorBorder,
            ]}>

                {leftIcon && (
                    <View style={styles.leftContainer}>
                        {leftIcon}
                    </View>
                )}
                {prefix &&
                    <SCText size={14} style={{
                        position: 'absolute',
                        zIndex: 4,
                        top: '30%',
                        left: 8,
                        color: COLORS.textBlack,
                    }}>{prefix}</SCText>
                }

                <TextInput
                    ref={ref}
                    autoCorrect
                    multiline={extendingField}
                    editable={editable}
                    maxLength={200}
                    allowFontScaling={false}
                    textAlignVertical="top"
                    placeholderTextColor={
                        editable
                            ? props.placeholderTextColor || COLORS.dotColor
                            : COLORS.disabledPlaceholderTextColor
                    }
                    {...rest}
                    onChangeText={(text) => {

                        // call parent onChangeText
                        rest.onChangeText?.(text);

                        // reset height when empty
                        if (extendingField && text.trim().length === 0) {
                            setInputHeight(MIN_HEIGHT);
                        }
                    }}
                    onFocus={e => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={e => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    scrollEnabled={
                        extendingField
                            ? inputHeight >= MAX_HEIGHT
                            : false
                    }
                    onContentSizeChange={(event) => {

                        if (!extendingField) return;

                        const height =
                            event.nativeEvent.contentSize.height;

                        setInputHeight(
                            Math.min(
                                MAX_HEIGHT,
                                Math.max(MIN_HEIGHT, height)
                            )
                        );
                    }}
                    style={[
                        {
                            height: extendingField
                                ? undefined
                                : isTablet
                                    ? 60
                                    : 46,

                            minHeight: extendingField
                                ? inputHeight
                                : undefined,

                            maxHeight: extendingField
                                ? MAX_HEIGHT
                                : undefined,

                            fontFamily: 'Figtree-Regular',
                            fontSize: font(14),

                            paddingHorizontal: leftIcon ? 36 : 12,
                            paddingVertical: extendingField ? 10 : 0,

                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: radius || 8,
                            backgroundColor: '#fff',
                        },

                        style,

                        (leftIcon || prefix)
                            ? styles.inputWithLeft
                            : undefined,

                        rightIcon
                            ? styles.inputWithRight
                            : undefined,

                        {
                            color: editable
                                ? COLORS.textBlack
                                : COLORS.themePrimary,

                            borderWidth: editable ? 1 : 0,

                            borderColor: editable
                                ? !isFocused
                                    ? COLORS.divider2
                                    : COLORS.lightBlue
                                : '',

                            backgroundColor: editable
                                ? COLORS.white
                                : COLORS.disabledInputBg,

                            paddingLeft: prefix ? 20 : undefined,
                        }
                    ]}
                />

                {rightIcon && (
                    <View style={styles.rightIcon}>
                        {rightIcon}
                    </View>
                )}
            </View>

            {props?.error && props?.error[0] && props?.error[1] && <SCText size={12} style={{ color: COLORS.redColor, }}>{props?.error[0] || '-'}</SCText>}

        </View>
    );
});




// export const SCDateInput = (props: ICCDateInput) => {
//     return <>
//         <CalendarModal {...props} show={props.show} close={props.close} calendarTheme={props.calendarTheme} />
//         <View style={props.wrapperStyle || { marginTop: 10, gap: 5 }}>
//             {props?.label && <SCText style={props.labelStyle}>{props.label}</SCText>}
//             <TouchableOpacity style={props.style || [{ ...globalStyles.rowCenterBetween, height: 40, paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.divider2, borderRadius: 8 }, props?.disabled && { backgroundColor: 'gray', borderColor: 'transparent' }]} activeOpacity={1} onPress={props?.onFieldPress}>
//                 <SCText
//                     style={{ color: !!props.value ? COLORS.textBlack : (props.placeholderTextColor || COLORS.divider2), fontSize: font(16) }}>{!!props.value ? dayjs(props.value).format('DD/MM/YYYY') : (props.placeholder || 'dd/mm/yyyy')}</SCText>
//                 <Icon name='calender' size={24} />
//             </TouchableOpacity>
//             {props?.error && props?.error[0] && props?.error[1] && <SCText style={{ color: 'red' }}>{props?.error[0] || '-'}</SCText>}
//         </View>
//     </>
// }


export const CCBox = (props: ICCCheckbox) => {
    const { label, labelStyle, wrapperStyle, value, onPress, error } = props;

    return (
        <View style={[{ gap: 6 }, wrapperStyle]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{ ...globalStyles.row, gap: 10 }}
            >
                <Icon
                    name="checkbox"
                    isActive={value}
                    size={18}
                    fill={COLORS.lightBlue}
                />
                {label && <SCText style={labelStyle}>{label}</SCText>}
            </TouchableOpacity>

            {error?.[1] && (
                <SCText size={12} style={{ color: 'red' }}>
                    {error[0]}
                </SCText>
            )}
        </View>
    );
};

export const SCMultilineTextInput = React.memo((props: ICCMultilineTextInput) => {
    const [isFocused, setIsFocused] = useState(false);
    const { editable = true, onFocus } = props
    return <View style={props.wrapperStyle || { marginTop: 10, }}>
        {/* {props?.label && <SCText varient='regular' style={props.labelStyle}>{props.label}</SCText>} */}
        <SCTextInput
            {...props}
            allowFontScaling={false}
            editable={editable}
            style={[
                {
                    fontFamily: 'Figtree-Regular',
                    height: isMobile ? 110 : 140,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    borderWidth: editable ? 1 : 0,
                    color: editable ? COLORS.textBlack : COLORS.themePrimary,
                    borderColor: editable ? !isFocused ? COLORS.divider2 : COLORS.lightBlue : '',
                    backgroundColor: editable ? COLORS.white : COLORS.disabledInputBg,
                    marginTop: 4
                },
                props.style,
            ]}
            textAlignVertical="top"
            placeholder={props.placeholder || 'Add Description'}
            placeholderTextColor={props.placeholderTextColor || COLORS.dotColor}
            multiline
            onFocus={e => {
                setIsFocused(true);
                props.onFocus?.(e);
            }}
            onBlur={e => {
                setIsFocused(false);
                props.onBlur?.(e);
            }}
        />

        {/* {props?.error && props?.error[0] && props?.error[1] && <SCText size={12} style={{ color: COLORS.redCard, paddingTop: 4 }}>{props?.error[0] || '-'}</SCText>} */}
    </View>
})

// type DateMode = "single" | "range"

// interface SCDateProp {
//     disabled?: boolean;
//     label?: string;
//     mode: 'single' | 'range';
//     value?: string | Date;
//     onChange?: (date: string | null) => void;
//     error?: string;
//     touched?: boolean;
//     maximumDate?: Date;
//     minimumDate?: Date;
//     placeholder?: string;
//     to?: string;
//     onToChange?: (date: string | null) => void;
//     errorTo?: string;
//     touchedTo?: boolean;
//     wrapperStyle?: ViewStyle;
//     parsedValue?: string;
//     allowFuture?: boolean;
//     showMultipleDaysToggle?: boolean;
//     onModeChange?: (isRange: boolean) => void;
// }

// export const SCDatePicker = ({
//     disabled,
//     label = "Date",
//     mode,
//     value,
//     onChange,
//     error,
//     touched,
//     maximumDate,
//     minimumDate,
//     placeholder = "Select date",
//     to,
//     errorTo,
//     onToChange,
//     touchedTo,
//     wrapperStyle,
//     parsedValue = "DD-MM-YYYY",
//     allowFuture,
//     showMultipleDaysToggle = false,
//     onModeChange,
// }: SCDateProp) => {
//     const [showPicker, setShowPicker] = useState(false);
//     const [type, setType] = useState<"single" | "from" | "to">("single");


//     const isRange = mode === 'range';

//     const getDate = (date?: string | Date | null) => {
//         if (!date) return new Date();
//         if (date instanceof Date) return date;
//         const parsed = dayjs(date, parsedValue);
//         return parsed.isValid() ? parsed.toDate() : new Date(date);
//     };

//     const handleConfirm = (date: any) => {
//         if ((type === "single" || type === "from") && onChange) onChange(date);
//         if (type === "to" && onToChange) onToChange(date);
//         setShowPicker(false);
//     };

//     const handleToggleMode = () => {
//         const newIsRange = !isRange;
//         onModeChange?.(newIsRange);
//     };

//     return (
//         <View style={wrapperStyle}>
//             {label && <SCText style={styles.label}>{label}</SCText>}

//             {isRange ? (
//                 <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
//                     <View style={{ flex: 1 }}>
//                         <TouchableOpacity
//                             disabled={disabled}
//                             style={inputBoxStyle(disabled)}
//                             onPress={() => { setType("from"); setShowPicker(true); }}
//                         >
//                             <SCText color={disabled ? COLORS.themePrimary : value ? COLORS.textBlack : COLORS.dotColor}>
//                                 {value ? value.toString() : "From Date"}
//                             </SCText>
//                             <Icon name="calender" />
//                         </TouchableOpacity>
//                         {error && touched && (
//                             <SCText size={12} style={{ marginTop: 4 }} color={COLORS.redCard}>{error}</SCText>
//                         )}
//                     </View>

//                     <View style={{ paddingTop: 14 }}>
//                         <Icon name="rightArrow" />
//                     </View>

//                     <View style={{ flex: 1 }}>
//                         <TouchableOpacity
//                             disabled={disabled}
//                             style={inputBoxStyle(disabled)}
//                             onPress={() => { setType("to"); setShowPicker(true); }}
//                         >
//                             <SCText color={disabled ? COLORS.themePrimary : to ? COLORS.textBlack : COLORS.dotColor}>
//                                 {to || "To Date"}
//                             </SCText>
//                             <Icon name="calender" />
//                         </TouchableOpacity>
//                         {errorTo && touchedTo && (
//                             <SCText size={12} style={{ marginTop: 4 }} color={COLORS.redCard}>{errorTo}</SCText>
//                         )}
//                     </View>
//                 </View>
//             ) : (
//                 <>
//                     <TouchableOpacity
//                         disabled={disabled}
//                         style={[inputBoxStyle(disabled), { width: '100%' }]}
//                         onPress={() => { setType("single"); setShowPicker(true); }}
//                         activeOpacity={0.8}
//                     >
//                         <SCText color={disabled ? COLORS.themePrimary : value ? COLORS.textBlack : COLORS.dotColor}>
//                             {value ? value.toString() : placeholder}
//                         </SCText>
//                         <Icon name="calender" />
//                     </TouchableOpacity>
//                     {error && touched && (
//                         <SCText style={{ marginTop: 4 }} size={12} color={COLORS.redCard}>{error}</SCText>
//                     )}
//                 </>
//             )}


//             {showMultipleDaysToggle && (
//                 <TouchableOpacity
//                     onPress={handleToggleMode}
//                     style={{ ...globalStyles.row, gap: 8, marginTop: 6, alignSelf: 'flex-start' }}
//                 >
//                     <Icon name={isRange ? "greenTick" : "emptybox"} size={18} />
//                     <SCText size={12} color={COLORS.themePrimary}>
//                         Select for multiple days
//                     </SCText>
//                 </TouchableOpacity>
//             )}

//             <DateTimePickerModal
//                 isVisible={showPicker}
//                 mode="date"

//                 display={
//                     isTablet
//                         ? "inline"
//                         : Platform.OS === 'ios'
//                             ? "spinner"
//                             : "default"
//                 }
//                 maximumDate={
//                     allowFuture ? undefined
//                         : type === "from" && to
//                             ? (maximumDate && maximumDate < getDate(to) ? maximumDate : getDate(to))
//                             : maximumDate
//                 }
//                 minimumDate={
//                     type === "to" && value
//                         ? (minimumDate && minimumDate > getDate(value) ? minimumDate : getDate(value))
//                         : minimumDate
//                 }
//                 date={type === "to" ? getDate(to) : getDate(value)}
//                 onConfirm={handleConfirm}
//                 onCancel={() => setShowPicker(false)}

//                 modalStyleIOS={isTablet ? {
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     margin: 0,
//                 } : undefined}
//                 pickerContainerStyleIOS={isTablet ? {
//                     width: 400,
//                     alignSelf: 'center',
//                     borderRadius: 16,
//                     overflow: 'hidden',
//                 } : undefined}
//             />
//         </View>
//     );
// };


// interface SCTimePickerProps {
//     label?: string
//     mode?: 'single' | 'range'
//     value?: string
//     to?: string
//     onChange?: (time: string) => void
//     onToChange?: (time: string) => void
//     error?: string
//     touched?: boolean
//     errorTo?: string
//     touchedTo?: boolean
//     wrapperStyle?: ViewStyle
//     placeholder?: string
//     showRangeToggle?: boolean
//     onModeChange?: (isRange: boolean) => void
//     disabled?: boolean
// }

// const toTimeDate = (time?: string) => {
//     if (!time) {
//         return new Date();
//     }
//     const parsed = dayjs(time, 'hh:mm A')
//     if (!parsed.isValid()) {
//         return new Date();
//     }

//     return dayjs().hour(parsed.hour()).minute(parsed.minute()).second(0).toDate();

// }

// export const SCTimePicker = ({
//     label = 'Time',
//     mode = 'single',
//     value,
//     to,
//     onChange,
//     onToChange,
//     error,
//     touched,
//     errorTo,
//     touchedTo,
//     wrapperStyle,
//     placeholder = 'Select time',
//     showRangeToggle = false,
//     onModeChange,
//     disabled = false,
// }: SCTimePickerProps) => {
//     const [showFromPicker, setShowFromPicker] = useState(false)
//     const [showToPicker, setShowToPicker] = useState(false)

//     const isRange = mode === 'range'

//     const handleConfirmFrom = (date: Date) => {
//         const formatted = dayjs(date).format('hh:mm A')
//         onChange?.(formatted)
//         setShowFromPicker(false);
//     }

//     const handleConfirmTo = (date: Date) => {
//         const formatted = dayjs(date).format('hh:mm A')
//         onToChange?.(formatted)
//         setShowToPicker(false)
//     }

//     const handleToggleMode = () => {
//         onModeChange?.(!isRange)
//     }

//     const pickerProps = {
//         is24Hour: false,
//         mode: 'time' as const,
//         display: isTablet
//             ? "inline"
//             : Platform.OS === 'ios'
//                 ? "spinner"
//                 : "default",
//         modalStyleIOS: isTablet
//             ? { justifyContent: 'center' as const, alignItems: 'center' as const, margin: 0 }
//             : undefined,
//         pickerContainerStyleIOS: isTablet
//             ? { width: 400, alignSelf: 'center' as const, borderRadius: 16, overflow: 'hidden' as const }
//             : undefined,
//     }
//     return (
//         <View style={wrapperStyle}>
//             {label && (
//                 <SCText size={14} style={{ color: COLORS.textBlack, paddingBottom: 4 }}>
//                     {label}
//                 </SCText>
//             )}

//             {isRange ? (

//                 <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

//                     <View style={{ flex: 1 }}>
//                         <TouchableOpacity
//                             disabled={disabled}
//                             style={inputBoxStyle(disabled)}
//                             onPress={() => setShowFromPicker(true)}
//                         >
//                             <SCText color={value ? COLORS.textBlack : COLORS.dotColor}>
//                                 {value || 'From time'}
//                             </SCText>
//                             <Icon name="calender" />
//                         </TouchableOpacity>
//                         {error && touched && (
//                             <SCText size={12} style={{ marginTop: 4 }} color={COLORS.redCard}>
//                                 {error}
//                             </SCText>
//                         )}
//                     </View>


//                     <View style={{ paddingTop: 14, paddingHorizontal: 6 }}>
//                         <Icon name="rightArrow" />
//                     </View>

//                     <View style={{ flex: 1 }}>
//                         <TouchableOpacity
//                             disabled={disabled}
//                             style={inputBoxStyle(disabled)}
//                             onPress={() => setShowToPicker(true)}
//                         >
//                             <SCText color={to ? COLORS.textBlack : COLORS.dotColor}>
//                                 {to || 'To time'}
//                             </SCText>
//                             <Icon name="calender" />
//                         </TouchableOpacity>
//                         {errorTo && touchedTo && (
//                             <SCText size={12} style={{ marginTop: 4 }} color={COLORS.redCard}>
//                                 {errorTo}
//                             </SCText>
//                         )}
//                     </View>
//                 </View>
//             ) : (
//                 <View>
//                     <TouchableOpacity
//                         disabled={disabled}
//                         style={[inputBoxStyle(disabled), { width: '100%' }]}
//                         onPress={() => setShowFromPicker(true)}
//                         activeOpacity={0.8}
//                     >
//                         <SCText color={value ? COLORS.textBlack : COLORS.dotColor}>
//                             {value || placeholder}
//                         </SCText>
//                         <Icon name="calender" />
//                     </TouchableOpacity>
//                     {error && touched && (
//                         <SCText size={12} style={{ marginTop: 4 }} color={COLORS.redCard}>
//                             {error}
//                         </SCText>
//                     )}
//                 </View>
//             )}


//             {showRangeToggle && (
//                 <TouchableOpacity
//                     onPress={handleToggleMode}
//                     style={{ ...globalStyles.row, gap: 8, marginTop: 6, alignSelf: 'flex-start' }}
//                 >
//                     <Icon name={isRange ? 'greenTick' : 'emptybox'} size={18} />
//                     <SCText size={12} color={COLORS.themePrimary}>
//                         Select time range
//                     </SCText>
//                 </TouchableOpacity>
//             )}


//             <DateTimePickerModal
//                 {...pickerProps}
//                 isVisible={showFromPicker}
//                 date={toTimeDate(value)}
//                 onConfirm={handleConfirmFrom}
//                 onCancel={() => setShowFromPicker(false)}
//                 display={isTablet && Platform.OS === 'ios' ? 'inline' : Platform.OS == 'ios' ? 'spinner' : 'default'}

//                 modalStyleIOS={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     margin: 0,
//                 }}
//                 pickerContainerStyleIOS={{
//                     width: 350,
//                     borderRadius: 16,
//                     overflow: 'hidden',
//                 }}

//             />

//             <DateTimePickerModal
//                 {...pickerProps}
//                 isVisible={showToPicker}
//                 date={toTimeDate(to || value)}
//                 onConfirm={handleConfirmTo}
//                 onCancel={() => setShowToPicker(false)}
//                 display={isTablet && Platform.OS === 'ios' ? 'inline' : Platform.OS == 'ios' ? 'spinner' : 'default'}

//                 modalStyleIOS={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     margin: 0,
//                 }}
//                 pickerContainerStyleIOS={{
//                     width: 350,
//                     borderRadius: 16,
//                     overflow: 'hidden',
//                 }}
//             />
//         </View>
//     )
// }

// const inputBoxStyle = (disabled?: boolean): ViewStyle => ({
//     justifyContent: 'space-between',
//     height: isTablet ? 60 : 46,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     borderWidth: disabled ? 0 : 1,
//     borderColor: disabled ? '' : COLORS.divider2,
//     backgroundColor: disabled ? COLORS.disabledInputBg : COLORS.white,
//     flexDirection: 'row',
//     alignItems: 'center',
// });

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // flex: 1
    },

    label: {
        paddingBottom: 4,
    },

    // inputWithIcon: {
    //     width: "100%",
    //     height: 46,
    //     borderWidth: 1,
    //     borderColor: COLORS.divider2,
    //     borderRadius: 8,
    //     paddingHorizontal: 12,
    //     backgroundColor: COLORS.white,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    // },

    error: {
        // marginTop: 4,
    },
    wrapper: {
        gap: 4,
        marginBottom: 12,
    },
    input: {

    },
    errorBorder: {
        borderColor: 'red',
    },
    disabled: {
        backgroundColor: COLORS.disabledInputBg,
        borderColor: '#ddd',
    },
    errorText: {
        color: 'red',
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
    },

    rightIcon: {
        position: 'absolute',
        right: 12,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputWithIcon: {
        paddingRight: 40,
    },
    // inputContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: COLORS.divider2,
    //     borderRadius: 8,
    //     backgroundColor: COLORS.white,
    //     height: 46,
    // },

    leftContainer: {
        position: 'absolute',
        left: 12,
        zIndex: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    prefix: {
        position: 'absolute',
        zIndex: 4,
        top: '33%',
        left: 10,
        color: COLORS.textBlack,
    },

    // input: {
    //     flex: 1,
    //     paddingHorizontal: 12,
    //     paddingVertical: 0,
    //     color: COLORS.textBlack,
    // },

    inputWithLeft: {
        paddingLeft: 8,
    },

    inputWithRight: {
        paddingRight: 40,
    },

    // rightIcon: {
    //     position: 'absolute',
    //     right: 12,
    // },

    // focused: {
    //     borderColor: COLORS.themeGreen,
    // },

    // errorBorder: {
    //     borderColor: COLORS.error,
    // },

    // disabled: {
    //     backgroundColor: COLORS.disabledBg,
    // },

    // errorText: {
    //     color: COLORS.error,
    //     marginTop: 4,
    // },

});
