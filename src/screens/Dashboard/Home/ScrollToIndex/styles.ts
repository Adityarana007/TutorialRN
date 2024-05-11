import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../theme/responsiveSize";
import colors from "../../../../theme/colors";

const styles = StyleSheet.create({
    flatlistStyle: {
        marginLeft: moderateScale(10)
    },
    listBoxView: {
        backgroundColor: colors.yellow,
        height: 30,
        marginLeft: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxText:{
        fontSize: 16,
        fontWeight: '600',
        color: colors.black
    }
});
export default styles;