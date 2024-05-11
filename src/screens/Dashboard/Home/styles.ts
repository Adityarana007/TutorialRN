import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { moderateScaleVertical, textScale } from "../../../theme/responsiveSize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // alignItems: 'center',

    },
    signinContinueView: {
        marginTop: moderateScaleVertical(60),
    },
    signinText: {
        fontSize: textScale(24),
        color: colors.black
    },
    loginText: {
        color: colors.white,
    },
    flexRow:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    marginTop10:{
        marginTop: moderateScaleVertical(10)
    }
});
export default styles;