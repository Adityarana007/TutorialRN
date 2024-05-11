import { Platform, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { actualDeviceSize, moderateScale, moderateScaleVertical, textScale } from "../../theme/responsiveSize";

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.black,
        height: Platform.OS === 'android' ? moderateScale(60) : moderateScale(100),
        width: actualDeviceSize.width,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    titleStyle:{
        color: colors.yellow,
        fontSize: textScale(24),
        fontWeight: '700'
    },
    iconTextView:{
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        flexGrow:1
    },
    iconView:{
        left: 20
    }
  
});

export default styles;