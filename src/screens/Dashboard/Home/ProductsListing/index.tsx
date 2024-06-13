import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {FlatListData} from '../../../../utils/constants';
import styles from './styles';
import Header from '../../../../components/Header';
import FastImage from 'react-native-fast-image';
import FastImageView from '../../../../components/FastImageView';
import { moderateScale, moderateScaleVertical } from '../../../../theme/responsiveSize';
import colors from '../../../../theme/colors';
import { useNav } from '../../../../navigation/useNav';
import { ScreenNameKeys } from '../../../../constants/ScreenNameKeys';

const ProductsListing = () => {
    const [index, setIndex] = useState(0);
    const [productsData, setProductsData] = useState([]);
    const navigation = useNav();

  const getColor = (status: string) => {
    switch(status){
      case "Low Stock":
        return colors.toastRed
      case "In Stock":        
        return colors.green
      default:
        return 'transparent'
    }

  };

  const onProductPress  = (item: any) => {
    navigation.navigate(ScreenNameKeys.PRODUCT_DETAILS, {
      id: item?.id
    });
  }
  
  const renderFlatlistCells = ({item}) => {
    return(
        <Pressable style={styles.listBoxView} onPress={() => onProductPress(item)}>
          {/* <Image style={styles.productImage} source={{uri: item?.images[0]}}/> */}
          <View style={{
            marginTop: 10,
            width: '100%',
          }}>

          <FastImageView
              imageUrl={item?.images[0]}
              width={moderateScale(100)}
              height={moderateScaleVertical(100)}
              resizeMode={FastImage.resizeMode.contain}
              borderRadius={moderateScaleVertical(5)}
              />
              </View>
        <Text style={styles.productName}>
            {item?.title}
        </Text>
        <Text style={styles.priceText}>Price: <Text style={styles.priceValue}>{item.price}</Text></Text>
        <View style={[styles.stockView, {backgroundColor: getColor(item?.availabilityStatus)}]}>
          <Text style={styles.stockText}>{item?.availabilityStatus}</Text>
        </View>
        </Pressable>
    )
  };

  const fetchData = async () => {
   const data = await fetch('https://dummyjson.com/products')
   const resjson = await  data.json();
   console.log('resdata', JSON.stringify(resjson.products, null, 1))
   setProductsData(resjson.products);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header title={'Products'} isLeftIcon={true} />
    <SafeAreaView>

      <View style={{
        alignItems: 'center',
        paddingBottom: 140
      }}>

        <FlatList
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={index}
          data={productsData}
          numColumns={2}
          style={styles.flatlistStyle}
          key={({item}: any) => item.id.toString()}
          renderItem={renderFlatlistCells}
        />
      </View>
    </SafeAreaView>
    </>

  );
};
export default ProductsListing;
