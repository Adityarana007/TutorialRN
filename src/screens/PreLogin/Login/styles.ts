import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { moderateScaleVertical, textScale } from "../../../theme/responsiveSize";
import fonts from "../../../assets/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        // flexGrow: 1
    },
    signinContinueView: {
        marginTop: moderateScaleVertical(60),
    },
    noAccountText: {
        fontSize: 16,
        color: colors.yellow,
        fontFamily: fonts.mulishBlack,
        marginTop: 10
    },
    signup:{
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.mulishBlack,
        textDecorationLine: 'underline'
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
    anotherSigninView:{
        marginTop: 30,
        backgroundColor: colors.yellow,
        paddingHorizontal: moderateScaleVertical(20),
        paddingVertical: moderateScaleVertical(10),
        borderRadius: 4,
        flexDirection: 'row'
    },
    googleText:{
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.mulishBlack,
        marginLeft: 8
    }
});
export default styles;