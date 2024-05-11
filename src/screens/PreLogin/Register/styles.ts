import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { moderateScaleVertical, textScale } from "../../../theme/responsiveSize";
import fonts from "../../../assets/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        flexGrow: 1
    },
    signinContinueView: {
        marginTop: moderateScaleVertical(60),
    },
    signup:{
        fontSize: 16,
        color: colors.yellow,
        fontFamily: fonts.mulishBlack,
        marginTop: 10

    },
    loginText: {
        color: colors.white,
    },
    btnOuterView: {
        marginTop: moderateScaleVertical(60),
    },
    marginTop30:{
        marginTop: moderateScaleVertical(30)
    },
    noAccountOuterView:{
        flexDirection: 'row'
    },
    signupTextOuterView:{
        justifyContent: 'flex-end'
    },
    signupText:{
        fontSize: 28,
        fontFamily: fonts.mulishBlack,
        marginTop: -30
    }
});
export default styles;