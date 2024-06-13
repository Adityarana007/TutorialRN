import React, {useState} from 'react';
import {View, Image, ViewStyle} from 'react-native';
import useStyle from './useStyle';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import colors from '../../theme/colors';
import {moderateScaleVertical} from '../../theme/responsiveSize';
import Shimmer from '../Shimmer';
import ImagePlaceHolder from '../ImagePlaceHolder';

/**
 * FastImageView Component
 *
 * This component is used to display images efficiently with support for caching and placeholder loading.
 * It can handle different image loading states such as loading, loaded, and error.
 * Additionally, it supports various customization options like image size, border, and resize mode.
 *
 * @param imageUrl - The URL of the image to be displayed.
 * @param width - The width of the image container.
 * @param height - The height of the image container.
 * @param borderRadius - The border radius of the image container. Default is 0.
 * @param isCircle - Specifies if the image should be displayed in a circular shape. Default is false.
 * @param borderWidth - The width of the border around the image container. Default is 0.
 * @param borderColor - The color of the border around the image container. Default is grey.
 * @param isProfileImage - Specifies if the image is a profile picture. Default is false.
 * @param useWidth - Specifies whether to use the width as the height for the image. Default is false.
 * @param containerStyle - Additional styles for the image container.
 * @param marginTop - The margin at the top of the image container. Default is -1.5.
 * @param resizeMode - The resize mode for the image. Default is 'cover'.
 * @param imageColor - The tint color of the image. Default is undefined.
 * @param onImageLoad - Callback function called when the image is loaded or fails to load. (Optional)
 *
 * @returns React Element representing the FastImageView component.
 */
interface Props {
  imageUrl: string | undefined;
  width: number | undefined;
  height: number | undefined;
  borderRadius?: number;
  isCircle?: boolean;
  borderColor?: string;
  borderWidth?: number;
  isProfileImage?: boolean;
  useWidth?: boolean;
  resizeMode?: ResizeMode;
  containerStyle?: ViewStyle;
  marginTop?: number;
  imageColor?: string;
  onImageLoad?: (param: boolean) => void;
}

/* A function that takes in the props and returns a view. */
const FastImageView = ({
  imageUrl,
  borderRadius = 0,
  width = 0,
  height = 0,
  isCircle,
  borderWidth = 0,
  borderColor = colors.grey,
  isProfileImage = false,
  useWidth = false,
  containerStyle = {},
  marginTop = -1.5,
  resizeMode = FastImage.resizeMode.cover,
  imageColor,
  onImageLoad,
}: Props) => {
  const styles = useStyle();
  console.log('imageUrlsss', imageUrl)
  /* A state variable that is used to check if the image is found or not. */
  const [isImageFound, setIsImageFound] = useState(true);

  /* A state variable that is used to check if the image is loaded or not. */
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  /**
   * OnLodingStart() is a function that sets the imageLoaded state to false.
   */
  const onLodingStart = () => {

    setIsImageLoaded(false);
  };

  /**
   * OnLoadEnd is a function that sets the imageLoaded state to true.
   */
  const onLoadEnd = () => {

    setIsImageLoaded(true);
    if (onImageLoad !== undefined) {
      onImageLoad(true);
    }
  };

  /**
   * OnLoadError() is a function that sets the state of imageFound to false.
   */
  const onLoadError = () => {

    setIsImageFound(false);
    if (onImageLoad !== undefined) {
      onImageLoad(false);
    }
  };
  const getImagePlaceholder = () => {

    if (isProfileImage) {
      return (
        <ImagePlaceHolder
          updateSize
          width={width}
          height={height}
          isProfileImage={isProfileImage}
        />
      );
    } else if (isCircle) {
      return (
        <ImagePlaceHolder updateSize width={width / 2} height={height / 2} />
      );
    } else {
      return <ImagePlaceHolder />;
    }
  };
  return (
    <View style={{...styles.imageSection, ...containerStyle}}>
      {imageUrl === null ||
      !isImageFound ||
      imageUrl === '' ||
      imageUrl === undefined ? (
        /* JSX for rendering placeholder when image is not available */
        <View
          style={{
            width: width,
            height: height,
            borderColor: colors.grey,
            borderWidth: borderWidth,
            marginTop: moderateScaleVertical(marginTop),
            backgroundColor: colors.white,
            borderRadius: moderateScaleVertical(borderRadius),
          }}>
          {getImagePlaceholder()}
        </View>
      ) : (
        /* JSX for rendering image when available */
        <View>
          {imageColor ? (
            <Image
              style={{
                height: useWidth ? width : height,
                width: width,
                tintColor: imageColor,
              }}
              source={{
                uri: imageUrl,
              }}
            />
          ) : (
            /* JSX for rendering FastImage component */

            <FastImage
              style={{
                width: width,
                height: useWidth ? width : height,
                borderColor: borderColor,
                marginTop: moderateScaleVertical(marginTop),
                borderWidth: borderWidth,
                borderRadius: moderateScaleVertical(borderRadius),
              }}
              source={{
                uri: imageUrl,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={resizeMode}
              onLoadStart={onLodingStart}
              onLoadEnd={onLoadEnd}
              onError={onLoadError}
            />
          )}
          {/* JSX for rendering shimmer effect while image is loading */}
          {!isImageLoaded && imageColor === undefined && (
            <View style={styles.shimmer}>
              <Shimmer
                width={width}
                height={height}
                borderRadius={borderRadius}
                leftBottomSpace={0}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FastImageView;
