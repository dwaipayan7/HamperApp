

import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'
import { isSmallDeviceWidth } from '@/utils/AllContext';
import { COLORS } from '@/constants/colors';
interface ITextProps extends TextProps {
    varient?: 'regular' | 'medium' | 'semibold' | 'bold';
    size?: number;
    color?: string;
}

// export const font = (size: number) => isMobile && size ||  isSmallDeviceWidth && size - 2 || size + 4

export const font = (size: number) => {
    if (isSmallDeviceWidth) return size - 1;
    return size;
};

const SCText = ({ varient = 'regular', color, size = 14, style, ...props }: ITextProps) => {

    const getFontFamily = () => {
        switch (varient) {
            case 'regular': return 'Figtree-Regular';
            case 'medium': return 'Figtree-Medium';
            case 'semibold': return 'Figtree-SemiBold';
            case 'bold': return 'Figtree-Bold';
            default: return 'Figtree-Regular';
        }
    };

    // console.log("THe COlor is: ", color);


    return (
        <Text
            allowFontScaling={false}
            {...props}
            style={[
                {
                    fontFamily: getFontFamily(),
                    fontSize: font(size),
                    color: color,
                },
                style,
            ]}
        >
            {props.children}
        </Text >
    );
};

export default SCText

const styles = StyleSheet.create({})