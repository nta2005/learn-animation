import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import {
	GestureHandlerRootView,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Emoji } from 'components';
import { images } from 'assets';
import {
	facebookStyles as styles,
	listEmoji as emojisData,
	EMOJI_SIZE,
	EMOJI_MARGIN,
	EMOJI_BAR_PADDING,
} from 'utils';

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

	const animatedGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: ({ x }) => {
			activeEmojiIndexSharedValue.value = getEmojiIndex(x);
		},

		onActive: ({ x }) => {
			activeEmojiIndexSharedValue.value = getEmojiIndex(x);
		},

		onFinish: ({ x }) => {
			runOnJS(selectEmoji)(x);
			activeEmojiIndexSharedValue.value = -1;
			emojisBarSharedValue.value = withTiming(0);
		},

		onEnd: ({ x }) => {
			runOnJS(selectEmoji)(x);
			activeEmojiIndexSharedValue.value = -1;
			emojisBarSharedValue.value = withTiming(0);
		},
	});

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.safeAreaView} />

			<View style={styles.post}>
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

				<TouchableOpacity
					style={styles.actionContainer}
					onLongPress={() => {
						emojisBarSharedValue.value = withTiming(1, { duration: 100 });
					}}>
					<Image
						source={
							selectedEmojiIndex !== null ? emojisData[selectedEmojiIndex] : images.like
						}
						style={styles.likeIcon}
					/>
					<Text style={styles.likeText}>Like</Text>
				</TouchableOpacity>

				<GestureHandlerRootView style={styles.gestureHandlerRootView}>
					<PanGestureHandler onGestureEvent={animatedGestureHandler}>
						<Animated.View style={[styles.emojisBar, emojisBarAnimationStyle]}>
							{/* render emojis */}
							{emojisData.map((emojiSource, index) => {
								return (
									<Emoji
										source={emojiSource}
										key={index}
										index={index}
										activeIndex={activeEmojiIndexSharedValue}
									/>
								);
							})}
						</Animated.View>
					</PanGestureHandler>
				</GestureHandlerRootView>
			</View>
		</View>
	);
};

export default FacebookPostReaction;
