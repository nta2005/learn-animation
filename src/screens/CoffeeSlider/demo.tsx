/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { WINDOW_HEIGHT, COFFEE_DATA } from 'utils';

let imageScale = 1.4;
const SLIDER_HEIGHT = WINDOW_HEIGHT - 100;
const IMG_HEIGHT = SLIDER_HEIGHT / 3;

export default function CoffeeSlider() {
	const [currentPageIndex, setCurrentPageIndex] = useState(0);

	return (
		<View style={styles.container}>
			<View style={{ height: 100 }}>
				<Text>Up</Text>
			</View>
			<ScrollView
				style={styles.slider}
				pagingEnabled
				onScroll={(e) => {
					const offsetY = e.nativeEvent.contentOffset.y;
					const _currentPageIndex = Math.round(offsetY / SLIDER_HEIGHT);
					setCurrentPageIndex(_currentPageIndex);
					// console.log(currentPageIndex);
				}}
				scrollEventThrottle={16}>
				{COFFEE_DATA.map(({ id, image }, index) => {
					imageScale = imageScale * 0.7;
					const result = currentPageIndex - index + 1;
					return (
						<View
							key={id}
							style={[
								styles.sliderItem,
								// {
								// 	transform: [
								// 		// {translateY: -IMG_HEIGHT * 0.5},
								// 		// {
								// 		//   scale: imageScale,
								// 		// },
								// 	],
								// },
							]}>
							<Image source={image} style={styles.sliderImage} />
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	slider: {
		flex: 1,
		height: SLIDER_HEIGHT,
	},

	sliderItem: {
		alignItems: 'center',
	},

	sliderImage: {
		height: IMG_HEIGHT,
		resizeMode: 'contain',
	},
});
