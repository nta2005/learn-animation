/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StyleSheet, Platform, View, SafeAreaView, Image } from 'react-native';

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	Extrapolate,
	interpolate,
	useDerivedValue,
} from 'react-native-reanimated';

import { userList as users, WINDOW_WIDTH as width } from 'utils';

const CubeCarousel: React.FC = () => {
	const x = useSharedValue(0);

	const perspective = width;
	const angle = Math.atan(perspective / (width / 2));
	const ratio = Platform.OS === 'ios' ? 2 : 1.2;

	const getStyle = (index: number) => {
		const offset = index * width;

		const inputRange = [offset - width, offset + width];

		const translateX = useDerivedValue(() => {
			return interpolate(
				x.value,
				inputRange,
				[width / ratio, -width / ratio],
				Extrapolate.CLAMP
			);
		});

		const rotateY = useDerivedValue(() => {
			return interpolate(x.value, inputRange, [angle, -angle], Extrapolate.CLAMP);
		});

		const translateX1 = useDerivedValue(() => {
			return interpolate(x.value, inputRange, [width / 2, -width / 2], Extrapolate.CLAMP);
		});

		const extra = width / ratio / Math.cos(angle / 2) - width / ratio;

		const translateX2 = useDerivedValue(() => {
			return interpolate(x.value, inputRange, [-extra, extra], Extrapolate.CLAMP);
		});

		return useAnimatedStyle(() => {
			return {
				...StyleSheet.absoluteFillObject,
				transform: [
					{ perspective },
					{ translateX: translateX.value },
					{ rotateY: rotateY.value + 'rad' },
					{ translateX: translateX1.value },
					{ translateX: translateX2.value },
				],
			};
		});
	};

	const getMaskStyle = (index: number) => {
		const offset = index * width;
		const inputRange = [offset - width, offset, offset + width];
		const opacity = useDerivedValue(() => {
			return interpolate(x.value, inputRange, [0.75, 0, 0.75], Extrapolate.CLAMP);
		});
		return useAnimatedStyle(() => {
			return {
				backgroundColor: 'black',
				...StyleSheet.absoluteFillObject,
				opacity: opacity.value,
			};
		});
	};

	const handleScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});

	return (
		<View style={styles.container}>
			{users.map((user, i) => (
				<Animated.View style={getStyle(i)} key={user.id}>
					<SafeAreaView style={styles.container}>
						<View style={styles.container}>
							<Image style={styles.image} source={user.avatar} />
						</View>
					</SafeAreaView>
					<Animated.View style={getMaskStyle(i)} />
				</Animated.View>
			))}
			<Animated.ScrollView
				style={StyleSheet.absoluteFillObject}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				snapToInterval={width}
				contentContainerStyle={{ width: width * users.length }}
				onScroll={handleScroll}
				decelerationRate={0.99}
				horizontal
			/>
		</View>
	);
};

export default CubeCarousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},

	image: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
		borderRadius: 5,
	},
});
