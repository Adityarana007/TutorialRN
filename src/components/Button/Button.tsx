import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '../../theme/responsiveSize';
import colors from '../../theme/colors';
import fonts from '../../assets/fonts';

interface Props {
    onPress?: () => void;
    title?: string;
    btnStyle?: any;
}

const Button = ({onPress, title, btnStyle}: Props) => {
    const handleBtnPress = () => {
        if(onPress !== undefined) {
            onPress();
        }
    } 
    return(
        <Pressable onPress={handleBtnPress} style={[styles.buttonView, btnStyle]}>
            <Text style={styles.titleStyle}>{title}</Text>
        </Pressable>
    )
};

export default Button;

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: colors.yellow,
        height: moderateScale(62),
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScaleVertical(200),
        // paddingHorizontal: moderateScale(80),
        borderRadius: 40,
    },
    titleStyle:{
        fontSize: textScale(18),
        color: colors.black,
        fontFamily: fonts.mulishBlack,
        textAlign: 'center'
    }
})