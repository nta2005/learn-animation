import { useAnimatedStyle, interpolate, Extrapolate, SharedValue } from 'react-native-reanimated';

export const getFeatureViewAnimation = (animatedValue: any, outputX: number) => {
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

export const useFeatureViewAnimation = (animatedValue: SharedValue<number>, outputX: number) => {
	return useAnimatedStyle(() => {
		const TRANSLATE_X_INPUT_RANGE = [0, 80];
		const translateY = {
			translateY: interpolate(animatedValue.value, [0, 100], [0, -50], Extrapolate.CLAMP),
		};
		return {
			transform: [
				{
					translateX: interpolate(
						animatedValue.value,
						TRANSLATE_X_INPUT_RANGE,
						[0, outputX],
						Extrapolate.CLAMP
					),
				},
				translateY,
			],
		};
	});
};
