import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { actualDeviceSize, moderateScaleVertical, textScale } from "../../../theme/responsiveSize";
import fonts from "../../../assets/fonts";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.white,
        // alignItems: 'center',
    },
    headingView:{
        alignItems: 'center',
        marginTop: moderateScaleVertical(20)
    },
    headingText:{
        color: colors.black,
        fontSize: 24,
        fontFamily: fonts.mulishBlack
    },
    userView:{
        backgroundColor: colors.yellow,
        padding: 20,
        width: actualDeviceSize.width - 32,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: moderateScaleVertical(20)
    },
    userName:{
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.mulishBold
    },
    ageText:{
        color: colors.grey,
        fontSize: 16,
        fontFamily: fonts.mulishBold
    },
    emailText:{
        color: colors.grey,
        fontSize: 14,
        fontFamily: fonts.mulishBold
    },
    deleteEditView:{
        flexDirection: 'row'
    },
    nameAgeView:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default styles;