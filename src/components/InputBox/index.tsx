import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '../../theme/responsiveSize';
import colors from '../../theme/colors';
import styles from './styles';

interface Props {
    placeholder?: string;
    onTextChange?: (param: string) => void;
    value?: string;
    multiline?: boolean;
    maxLength?: number;
    secureTextEntry?: boolean;
    floatingText?: string;
}

const InputBox = ({placeholder, floatingText, onTextChange, value, multiline, maxLength, secureTextEntry}: Props) => {
    const onChangeText = (val: string) => {
        if(onTextChange !== undefined) {
            onTextChange(val);
        }
    }
    return(
        <View>
            {
                floatingText && (
<View style={styles.upperTextView}>
                <Text style={styles.floatingTextStyle}>{floatingText}</Text>
            </View>
                )
            }
            
        <View style={styles.inputOuterView}>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                value={value}
                maxLength={maxLength}
                multiline={multiline}
                style={styles.textInput}
                placeholderTextColor={colors.grey}
            />
        </View>
        </View>

    )
};

export default InputBox;
