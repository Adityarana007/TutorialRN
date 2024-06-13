import { StyleSheet } from "react-native";
import { actualDeviceSize, moderateScale, moderateScaleVertical } from "../../../../theme/responsiveSize";
import colors from "../../../../theme/colors";
import fonts from "../../../../assets/fonts";

const styles = StyleSheet.create({
    flatlistStyle: {
        // marginLeft: moderateScale(10)
    },
    listBoxView: {
        backgroundColor: colors.yellow,     
        marginHorizontal: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        borderRadius: 4,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.grey,
        height: moderateScaleVertical(250),
        width: actualDeviceSize.width / 2.3
    },
    productImage:{
        height: 80,
        width: 100
    },
    productName:{
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        textAlign: 'center'
    },
    priceText:{
            fontSize: 16,
            fontWeight: '600',
            color: colors.red,
            fontFamily: fonts.mulishSemiBold,
            textAlign: 'center',
    },
    priceValue:{
        color: colors.red,
        fontFamily: fonts.mulishBlack

    },
    stockView:{
        // height: 20,
        backgroundColor: 'red',
        // width: 80,
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 10
    },
    stockText:{
        color: colors.white,
        fontFamily: fonts.mulishBold,

    }
});
export default styles;