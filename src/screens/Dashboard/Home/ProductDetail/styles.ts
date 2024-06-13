import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import fonts from "../../../../assets/fonts";
import { moderateScale, moderateScaleVertical } from "../../../../theme/responsiveSize";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
    innercontainer:{
        marginHorizontal: moderateScale(10)
    },
    productHeading:{
        fontSize: 20,
        fontFamily: fonts.mulishBlack,
        color: colors.black,
        width: '70%'
    },
    description:{
        fontSize: 16,
        fontFamily: fonts.mulishRegular,
        color: colors.grey
    },
    sku:{
        fontSize: 14,
        fontFamily: fonts.mulishSemiBold,
        color: colors.yellow,
        marginTop: moderateScaleVertical(10)
    },
    shareBtn:{
        backgroundColor: colors.yellow,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 4
    },
    shareText:{
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.mulishBold
    }
})
