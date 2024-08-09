import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { moderateScaleVertical } from "../../../theme/responsiveSize";

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
})
export default styles;