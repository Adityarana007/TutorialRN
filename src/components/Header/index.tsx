import React from 'react';
import { Pressable, SafeAreaView, Text, View } from "react-native"
import styles from './styles';
import { Icons } from '../../assets/icons';
import { useNav } from '../../navigation/useNav';
import { ScreenNameKeys } from '../../constants/ScreenNameKeys';

interface Props {
    title?: string;
    isLeftIcon?: boolean
}

const Header = ({title, isLeftIcon}: Props) => {
    const navigation = useNav();
    const onLeftIconPress = () => {
        navigation.goBack();
    }
    return(
        <SafeAreaView style={styles.headerContainer}>
            {
                isLeftIcon && (
                    <Pressable style={styles.iconView} onPress={onLeftIconPress}>
                    <Icons.BackIcon height={24} width={24}/>
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