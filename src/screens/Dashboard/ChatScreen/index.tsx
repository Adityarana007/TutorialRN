import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../../components/Header'
import styles from './styles'

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Header title={'Chat'} isLeftIcon={true} />
      </View>
  )
}
export default ChatScreen
