import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ScreenNameKeys } from "../constants/ScreenNameKeys";
import { useNav } from "./useNav";
import colors from "../theme/colors";
import fonts from "../assets/fonts";
import { moderateScaleVertical } from "../theme/responsiveSize";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const CustomDrawerContent = props => {
    const navigation = useNav();
    return(
        <DrawerContentScrollView>

        <TouchableOpacity
        style={[styles.buttonView, {marginTop: 30}]}
        onPress={() => {
            navigation.navigate(ScreenNameKeys.FIRESTORE)
        }}>
            <Text style={styles.buttonText}>FireStore</Text>
        </TouchableOpacity>
            </DrawerContentScrollView>
    )
};

const styles = StyleSheet.create({
    buttonView:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.yellow,
        marginTop: moderateScaleVertical(10),
        padding: 16
    },
    buttonText:{
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.mulishBold
    }
})

export default CustomDrawerContent;