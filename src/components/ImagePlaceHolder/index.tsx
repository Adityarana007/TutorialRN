import React from 'react';
import {View} from 'react-native';
import useStyle from './useStyle';
import {Icons} from '../../assets/icons';
import colors from '../../theme/colors';

interface Props {
  width?: number;
  height?: number;
  updateSize?: boolean;
  isProfileImage?: boolean;
}

/* A function that returns a view with a image. */
/**
 * ImagePlaceHolder Component
 *
 * This component represents a placeholder for an image, typically used for loading placeholders.
 *
 * @param width - The width of the placeholder image. (Optional)
 * @param height - The height of the placeholder image. (Optional)
 * @param updateSize - Specifies whether to update the size of the placeholder image. Default is false. (Optional)
 * @param isProfileImage - Specifies whether the placeholder is for a profile image. Default is false. (Optional)
 * @returns React Element representing the ImagePlaceHolder component.
 */
const ImagePlaceHolder = ({
  width,
  height,
  updateSize,
  isProfileImage = false,
}: Props) => {
  const styles = useStyle();

  /**
   * getImage Function
   *
   * This function returns the appropriate placeholder image based on the props.
   *
   * @returns React Element representing the placeholder image.
   */
  const getImage = () => {
    if (isProfileImage) {
      return <Icons.ImagePlace width={width} height={height} />;
    } else if (updateSize) {
      return <Icons.ImagePlace width={width} height={height} />;
    } else {
      return (
        <Icons.ImagePlace
          width={width}
          height={height}
          stroke={colors.primaryYellow}
        />
      );
    }
  };
  return <View style={styles.continer}>{getImage()}</View>;
};

export default ImagePlaceHolder;
