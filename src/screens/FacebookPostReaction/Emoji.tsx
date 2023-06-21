import React from 'react';
import { ImageSourcePropType } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withSpring,
	interpolate,
	Extrapolate,
	withTiming,
} from 'react-native-reanimated';
import { facebookStyles as styles } from 'utils';

const Emoji = ({
	source,
	index,
	activeIndex,
}: {
	source: ImageSourcePropType;
	index: number;
	activeIndex: Animated.SharedValue<number>;
}) => {
	const animationStyle = useAnimatedStyle(() => {
		const scaleAnimation = interpolate(
			activeIndex.value,
			[index - 1, index, index + 1],
			[0.8, 1, 0.8],
			Extrapolate.CLAMP
		);

		const topAnimation = interpolate(
			activeIndex.value,
			[index - 1, index, index + 1],
			[1, -5, 1],
			Extrapolate.CLAMP
		);

		return {
			transform: [
				{
					scale: withSpring(scaleAnimation),
				},
			],

			top: withTiming(topAnimation),
		};
	});

	return <Animated.Image source={source} style={[styles.emoji, animationStyle]} />;
};

export default Emoji;
