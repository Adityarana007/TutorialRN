import {StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../theme/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    gridImageContainer: {
      width: moderateScaleVertical(164),
      height: moderateScaleVertical(164),
      borderRadius: moderateScaleVertical(24),
      aspectRatio: 1.2,
    },

    imageSection: {
      width: '100%',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },

    shimmer: {
      position: 'absolute',
    },
  });
};

export default useStyle;
