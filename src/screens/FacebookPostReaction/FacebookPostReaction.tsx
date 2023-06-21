import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import {
	GestureHandlerRootView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	GestureDetector,
	Gesture,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { images } from 'assets';
import {
	facebookStyles as styles,
	listEmoji as emojisData,
	EMOJI_SIZE,
	EMOJI_MARGIN,
	EMOJI_BAR_PADDING,
} from 'utils';

import Emoji from './Emoji';

const EMOJI_SPACE = EMOJI_SIZE + EMOJI_MARGIN * 2 + EMOJI_BAR_PADDING;

const getEmojiIndex = (positionX: number) => {
	'worklet';
	return Math.ceil(positionX / EMOJI_SPACE) - 1;
};

const FacebookPostReaction: React.FC = () => {
	const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<null | number>(null);
	const emojisBarSharedValue = useSharedValue(0);
	const emojisBarAnimationStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: emojisBarSharedValue.value }],
		};
	}, []);

	const activeEmojiIndexSharedValue = useSharedValue(-1);

	const selectEmoji = (x: number) => {
		const index = Math.ceil(x / EMOJI_SPACE) - 1;
		setSelectedEmojiIndex(index);
	};

	const hideEmojibar = () => {
		emojisBarSharedValue.value = withTiming(0, { duration: 100 });
	};

	const isLongPressed = useSharedValue(false);

	const tap = Gesture.Tap().onStart(() => {
		if (emojisBarSharedValue.value !== 0) {
			runOnJS(hideEmojibar)();
		}
	});

	const longPress = Gesture.LongPress()
		.minDuration(500)
		.onStart(() => {
			emojisBarSharedValue.value = withTiming(1, { duration: 100 });
			isLongPressed.value = true;
		});

	const panGesture = Gesture.Pan()
		.manualActivation(true)
		.onTouchesMove((event, stateManager) => {
			if (isLongPressed.value) {
				stateManager.activate();
			} else {
				stateManager.fail();
			}
		})
		.onUpdate((event) => {
			if (event.y > -50 && event.y < 10) {
				activeEmojiIndexSharedValue.value = getEmojiIndex(event.x);
			} else {
				runOnJS(setSelectedEmojiIndex)(null);
				activeEmojiIndexSharedValue.value = -1;
			}
		})
		.onEnd((event) => {
			if (event.y > -50 && event.y < 10) {
				runOnJS(selectEmoji)(event.x);
				activeEmojiIndexSharedValue.value = -1;
				emojisBarSharedValue.value = withTiming(0);
			} else {
				runOnJS(setSelectedEmojiIndex)(null);
				activeEmojiIndexSharedValue.value = -1;
				emojisBarSharedValue.value = withTiming(0);
			}
		})
		.onTouchesUp(() => {
			isLongPressed.value = false;
		});

	const composed = Gesture.Simultaneous(tap, longPress, panGesture);

	const handleLike = () => {
		if (emojisBarSharedValue.value !== 0) {
			hideEmojibar();
		}
		runOnJS(setSelectedEmojiIndex)(selectedEmojiIndex !== null ? null : 0);
	};

	const renderEmojiText = (index: null | number) => {
		switch (index) {
			case 0:
				return 'Like';

			case 1:
				return 'Love';

			case 2:
				return 'Haha';

			case 3:
				return 'Wow';

			case 4:
				return 'Sad';

			default:
				return 'Like';
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView style={styles.safeAreaView} />

			<View style={styles.post}>
				<TouchableWithoutFeedback onPress={hideEmojibar}>
					<View style={styles.authorInfoRow}>
						<Image source={images.logo} style={styles.authorAvatar} />
						<View>
							<Text style={styles.authorName}>Facebook</Text>
							<Text style={styles.postedTime}>Today</Text>
						</View>
					</View>

					<View>
						<Text style={styles.postContentText}>Facebook Post Reaction</Text>
						<Image source={images.banner} style={styles.postImage} />
					</View>
				</TouchableWithoutFeedback>

				<View style={styles.gestureHandlerRootView}>
					<GestureDetector gesture={composed}>
						<View>
							<View style={styles.actionContainer}>
								<TouchableOpacity style={styles.likeContainer} onPress={handleLike}>
									<Image
										source={
											selectedEmojiIndex !== null
												? emojisData[selectedEmojiIndex]
												: images.like
										}
										style={styles.likeIcon}
									/>
									<Text style={styles.likeText}>
										{renderEmojiText(selectedEmojiIndex)}
									</Text>
								</TouchableOpacity>
							</View>

							<Animated.View style={[styles.emojisBar, emojisBarAnimationStyle]}>
								{emojisData.map((emojiSource, index) => {
									return (
										<TouchableOpacity
											key={index}
											onPress={() => {
												setSelectedEmojiIndex(index);
												hideEmojibar();
											}}>
											<Emoji
												source={emojiSource}
												index={index}
												activeIndex={activeEmojiIndexSharedValue}
											/>
										</TouchableOpacity>
									);
								})}
							</Animated.View>
						</View>
					</GestureDetector>
				</View>
			</View>
		</GestureHandlerRootView>
	);
};

export default FacebookPostReaction;
