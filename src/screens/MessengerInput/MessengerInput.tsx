import React, { useState } from 'react';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	Extrapolate,
	withTiming,
} from 'react-native-reanimated';

import { images } from 'assets';
import { WINDOW_WIDTH } from 'utils';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ICON_SIZE = 20;
const PADDING_X = 8;
const CONTENT_WIDTH = WINDOW_WIDTH - PADDING_X * 2;
const EXPAND_BUTTON_WIDTH = 36;
const SUBMIT_BUTTON_WIDTH = 36;
const MAIN_SECTION_WIDTH = CONTENT_WIDTH - EXPAND_BUTTON_WIDTH - SUBMIT_BUTTON_WIDTH;
const INPUT_WIDTH = MAIN_SECTION_WIDTH / 2;

const MessengerInput: React.FC = () => {
	const [message, setMessage] = useState('');

	const animatedSharedValue = useSharedValue(INPUT_WIDTH);

	const messageInputAnimation = useAnimatedStyle(() => {
		return {
			width: withTiming(animatedSharedValue.value),
		};
	}, []);

	const featureIconAnimation = useAnimatedStyle(() => {
		return {
			width: withTiming(
				interpolate(
					animatedSharedValue.value,
					[INPUT_WIDTH, MAIN_SECTION_WIDTH],
					[20, 0],
					Extrapolate.CLAMP
				)
			),
		};
	}, []);

	const expandButtonAnimation = useAnimatedStyle(() => {
		return {
			width: withTiming(
				interpolate(
					animatedSharedValue.value,
					[INPUT_WIDTH, MAIN_SECTION_WIDTH],
					[0, EXPAND_BUTTON_WIDTH],
					Extrapolate.CLAMP
				)
			),
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				<View style={styles.bottomContainer}>
					{/* Start left section */}
					<AnimatedTouchableOpacity
						onPress={() => {
							animatedSharedValue.value = INPUT_WIDTH;
						}}
						style={[styles.expandButton, expandButtonAnimation]}>
						<Image source={images.messenger.caretRight} style={styles.icon} />
					</AnimatedTouchableOpacity>

					<Animated.Image
						source={images.messenger.action}
						style={[styles.icon, featureIconAnimation]}
					/>
					<Animated.Image
						source={images.messenger.camera}
						style={[styles.icon, featureIconAnimation]}
					/>
					<Animated.Image
						source={images.messenger.gallery}
						style={[styles.icon, featureIconAnimation]}
					/>
					<Animated.Image
						source={images.messenger.voice}
						style={[styles.icon, featureIconAnimation]}
					/>

					<AnimatedTextInput
						style={[styles.messageInput, messageInputAnimation]}
						onPressIn={() => {
							animatedSharedValue.value = MAIN_SECTION_WIDTH;
						}}
						onBlur={() => (animatedSharedValue.value = INPUT_WIDTH)}
						onChangeText={(text) => setMessage(text)}
						value={message}
					/>
					{/* End left section */}

					{/* Start right section */}
					<TouchableOpacity style={styles.submitButton}>
						{!message ? (
							<Image source={images.messenger.like} style={styles.icon} />
						) : (
							<Image source={images.messenger.send} style={styles.icon} />
						)}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MessengerInput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'flex-end',
	},

	scrollView: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},

	bottomContainer: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: PADDING_X,
		marginBottom: 16,
	},

	expandButton: {
		position: 'absolute',
		left: 0,
		overflow: 'hidden',
	},

	icon: {
		height: ICON_SIZE,
		resizeMode: 'contain',
		tintColor: '#0584FE',
	},

	messageInput: {
		height: 36,
		paddingHorizontal: 16,
		marginRight: SUBMIT_BUTTON_WIDTH,
		backgroundColor: '#333',
		zIndex: 100,
		borderRadius: 16,
		color: 'white',
	},

	submitButton: {
		position: 'absolute',
		right: 0,
		width: SUBMIT_BUTTON_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
