import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect} from 'react';
import {Animated, View, ViewStyle} from 'react-native';
import {moderateScaleVertical} from '../../theme/responsiveSize';
import colors from '../../theme/colors';

// Create a Shimmer component using react-native-shimmer-placeholder
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// Define the props for the Shimmer component
interface Props {
  leftBottomSpace?: number;
  bottomSpace?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
}

// Define the Shimmer component
const Shimmer = ({
  leftBottomSpace = -1,
  bottomSpace = -1,
  borderRadius = 20,
  width,
  height,
}: Props) => {
  // Create a reference for the Shimmer animation
  const avatarRef = React.createRef();

  // Define the container style for positioning the Shimmer
  const containerstyle: ViewStyle = {
    flexDirection: 'row',
    marginStart: leftBottomSpace,
    marginBottom: leftBottomSpace + bottomSpace,
  };

  // Handle the animation effect
  useEffect(() => {
    // Start the animation when the component mounts
    if (avatarRef.current) {
      const facebookAnimated = Animated.stagger(400, [
        avatarRef.current.getAnimated(),
      ]);
      Animated.loop(facebookAnimated).start();
    }
  }, []);

  return (
    <View>
      {/* Render the Shimmer component within a View */}
      <View style={containerstyle}>
        <ShimmerPlaceholder
          ref={avatarRef}
          stopAutoRun
          shimmerColors={[colors.lightGrey, colors.grey, colors.lightGrey]}
          delay={1200}
          duration={1000}
          style={{
            width: width,
            height: height,
            borderRadius: moderateScaleVertical(borderRadius),
          }}
        />
      </View>
    </View>
  );
};

export default Shimmer;
