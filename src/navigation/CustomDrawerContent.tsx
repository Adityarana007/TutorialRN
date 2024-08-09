import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ScreenNameKeys } from "../constants/ScreenNameKeys";
import { useNav } from "./useNav";
import colors from "../theme/colors";
import fonts from "../assets/fonts";
import { moderateScaleVertical } from "../theme/responsiveSize";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useConnection } from "@sendbird/uikit-react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../stores/userStorage";

const CustomDrawerContent = props => {
    const navigation = useNav();
  const { connect } = useConnection();
  const {data} = useContext(UserContext);

   // sendbird initialization code starts ----
   useEffect(() => {
    console.log('hsjksh')
    // sendbirdInit();
    const params = {
      userId: data.userData.id,
      nickname: data.userData.name,
    }
    // sbConnect(params.userId, params.nickname)
    connect(String(params.userId), { nickname: data.userData.name })
   }, [])

    return(
        <DrawerContentScrollView bounces={false}>

        <TouchableOpacity
        style={[styles.buttonView, {marginTop: 30}]}
        onPress={() => {
            navigation.navigate(ScreenNameKeys.FIRESTORE)
        }}>
            <Text style={styles.buttonText}>FireStore</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.buttonView, {marginTop: 30}]}
        onPress={() => {
            navigation.navigate(ScreenNameKeys.CHAT_SCREEN)
        }}>
            <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>

        <View style={styles.separatorView}></View>

        
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
    },
    separatorView:{
        height: 1,
        marginTop: 30,
        width: '100%',
        backgroundColor: colors.lightGrey
    }
})

export default CustomDrawerContent;