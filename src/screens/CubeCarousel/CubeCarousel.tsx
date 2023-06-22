import React, { useRef } from 'react';
import { StyleSheet, Animated, Platform, View, SafeAreaView, Image } from 'react-native';
import { userList as users, WINDOW_WIDTH as width } from 'utils';

const CubeCarousel: React.FC = () => {
	const x = useRef(new Animated.Value(0)).current;

	const perspective = width;
	const angle = Math.atan(perspective / (width / 2));
	const ratio = Platform.OS === 'ios' ? 2 : 1.2;

	const getStyle = (index: number) => {
		const offset = index * width;

		const inputRange = [offset - width, offset + width];

		const translateX = x.interpolate({
			inputRange,
			outputRange: [width / ratio, -width / ratio],
			extrapolate: 'clamp',
		});

		const rotateY = x.interpolate({
			inputRange,
			outputRange: [`${angle}rad`, `-${angle}rad`],
			extrapolate: 'clamp',
		});

		const translateX1 = x.interpolate({
			inputRange,
			outputRange: [width / 2, -width / 2],
			extrapolate: 'clamp',
		});

		const extra = width / ratio / Math.cos(angle / 2) - width / ratio;

		const translateX2 = x.interpolate({
			inputRange,
			outputRange: [-extra, extra],
			extrapolate: 'clamp',
		});

		return {
			...StyleSheet.absoluteFillObject,
			transform: [
				{ perspective },
				{ translateX },
				{ rotateY },
				{ translateX: translateX1 },
				{ translateX: translateX2 },
			],
		};
	};

	const getMaskStyle = (index: number) => {
		const offset = index * width;
		const inputRange = [offset - width, offset, offset + width];
		const opacity = x.interpolate({
			inputRange,
			outputRange: [0.75, 0, 0.75],
			extrapolate: 'clamp',
		});
		return {
			backgroundColor: 'black',
			...StyleSheet.absoluteFillObject,
			opacity,
		};
	};

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
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x },
							},
						},
					],
					{ useNativeDriver: false }
				)}
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
