import { Dimensions } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const getFeatureViewAnimation = (animatedValue: any, outputX: number) => {
	const TRANSLATE_X_INPUT_RANGE = [0, 80];
	const translateY = {
		translateY: animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [0, -50],
			extrapolate: 'clamp',
		}),
	};
	return {
		transform: [
			{
				translateX: animatedValue.interpolate({
					inputRange: TRANSLATE_X_INPUT_RANGE,
					outputRange: [0, outputX],
					extrapolate: 'clamp',
				}),
			},
			translateY,
		],
	};
};

export { WINDOW_HEIGHT, WINDOW_WIDTH, getFeatureViewAnimation };
