import {SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../components/Header';
import {styles} from './styles';
import FastImageView from '../../../../components/FastImageView';
import FastImage from 'react-native-fast-image';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../theme/responsiveSize';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ProductDetails = (props: any) => {
  console.log('params', props?.route?.params);
  const {id} = props?.route?.params;
  const [productsDetail, setProductsDetail] = useState({});

  const fetchData = async () => {
    try {
      const data = await fetch(`https://dummyjson.com/products/${id}`);
      console.log('sssdd', data);
      const resjson = await data.json();
      console.log('resdata', JSON.stringify(resjson, null, 1));
      // setProductsData(resjson.products);
      setProductsDetail(resjson);
    } catch (error) {
      console.error('Fetch Error', error);
    }
  };

  console.log('pdetail___', productsDetail);
  useEffect(() => {
    fetchData();
  }, []);
  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://tutorialrn.page.link/iGuj?productId=${id}`,
          domainUriPrefix: 'https://tutorialrn.page.link',
          android: {
            packageName: 'com.tutorialrn',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link__', link);
      return link;
    } catch (err) {
      console.log('Generate Error', err);
    }
  };

  const shareProduct = async () => {
    const getLink = await generateLink();
    try {
      Share.share({
        message: getLink,
      });
    } catch (err) {
      console.log('Share Error', err);
    }
  };
  return (
    <>
      <Header title="Product Details" isLeftIcon />
      <SafeAreaView style={styles.container}>
        <View style={styles.innercontainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.productHeading}>{productsDetail?.title}</Text>
            <TouchableOpacity onPress={shareProduct} style={styles.shareBtn}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          {productsDetail?.images && productsDetail.images[0] && (
            <FastImageView
              imageUrl={productsDetail.images[0]}
              width={moderateScale(300)}
              height={moderateScaleVertical(300)}
              resizeMode={FastImage.resizeMode.contain}
              borderRadius={moderateScaleVertical(5)}
            />
          )}
          <Text style={styles.description}>{productsDetail?.description}</Text>
          <Text style={styles.sku}>SKU: {productsDetail?.sku}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProductDetails;
