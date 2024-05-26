import React from 'react';
import { Pressable, SafeAreaView, Text, View } from "react-native"
import styles from './styles';
import { Icons } from '../../assets/icons';
import { useNav } from '../../navigation/useNav';
import { ScreenNameKeys } from '../../constants/ScreenNameKeys';
import { DrawerActions } from '@react-navigation/native';
import { hitSlopProp } from '../../utils/commonStyles';

interface Props {
    title?: string;
    isLeftIcon?: boolean
    isHamburger?: any
}

const Header = ({title, isLeftIcon, isHamburger}: Props) => {
    const navigation = useNav();
    const onLeftIconPress = () => {
        navigation.goBack();
    }
    return(
        <SafeAreaView style={styles.headerContainer}>

            {
                isLeftIcon && !isHamburger && (
                    <Pressable style={styles.iconView} onPress={onLeftIconPress}>
                    <Icons.BackIcon height={24} width={24}/>
                </Pressable>
                )
            }
            {
                isHamburger && (
                    <Pressable style={styles.iconView} hitSlop={hitSlopProp} onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                    }}>
                    <Icons.Hamburger height={24} width={24}/>
                </Pressable>
                )
            }

            <View style={styles.iconTextView}>
            <Text style={styles.titleStyle}>{title}</Text>
            </View>
            
        </SafeAreaView>
    )
};

export default Header;