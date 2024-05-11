import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { actualDeviceSize, moderateScale, moderateScaleVertical, textScale } from "../../theme/responsiveSize";
import fonts from "../../assets/fonts";

const styles = StyleSheet.create({
    inputOuterView: {
        backgroundColor: colors.lightGrey,
        height: moderateScale(38),
        width: actualDeviceSize.width - 32,
        borderRadius: 20
    },
    titleStyle:{
        fontSize: textScale(18),
        color: colors.black
    },
    textInput: {
        backgroundColor: colors.lightGrey,
        height: moderateScale(38),
        paddingHorizontal: moderateScale(20),
        borderRadius: 12
    },
    upperTextView: {
        alignItems: 'center',
        marginBottom: 10
    },
    floatingTextStyle:{
        color: colors.black,
        fontFamily: fonts.mulishBlack,
        fontSize: 20,
    }
});

export default styles;