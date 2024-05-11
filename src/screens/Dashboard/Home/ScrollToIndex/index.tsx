import React, { useState } from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {FlatListData} from '../../../../utils/constants';
import styles from './styles';

const ScrollToIndex = () => {
    const [index, setIndex] = useState(0);
  const renderFlatlistCells = ({item}) => {
    return(
        <View style={styles.listBoxView}>
        <Text style={styles.boxText}>
            {item?.name}
        </Text>
        </View>
    )
  };
  return (
    <SafeAreaView>
      <View>
        <FlatList
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={index}
          data={FlatListData}
          horizontal
          style={styles.flatlistStyle}
          key={({item}: any) => item.id.toString()}
          renderItem={renderFlatlistCells}
        />
      </View>
    </SafeAreaView>
  );
};
export default ScrollToIndex;
