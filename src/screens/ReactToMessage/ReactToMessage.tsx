import React, { useCallback, useRef, useState } from 'react';
import {
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Animated,
} from 'react-native';

import { images } from 'assets';
import { WINDOW_WIDTH } from 'utils';
import { AnimatedHeart } from 'components';

const ReactToMessage: React.FC = () => {
	const [heartCount, setHeartCount] = useState(0);
	const [hearts, setHearts] = useState<{ id: string }[]>([]);

	const heartCountAnimatedValue = useRef(new Animated.Value(0)).current;
	const heartTimeout = useRef<ReturnType<typeof setTimeout>>();

	const getUniqueId = () => {
		return Math.floor(Math.random() * Date.now()).toString();
	};

	const handleCompleteAnimation = useCallback((id: string) => {
		setHearts((oldHearts) => [...oldHearts].filter((heart) => heart.id !== id));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.messageContainer}>
				<Image style={styles.messageAvatar} source={images.users.girl3} />
				<View style={styles.messageContent}>
					<Text style={styles.messageText}>React To Message</Text>
				</View>

				<TouchableOpacity
					style={[styles.reactionButton, styles.heartButton]}
					activeOpacity={1}
					onPress={() => {
						if (heartTimeout.current) {
							clearTimeout(heartTimeout.current);
						}

						setHeartCount(heartCount + 1);
						setHearts([...hearts, { id: getUniqueId() }]);

						heartTimeout.current = setTimeout(() => {
							Animated.spring(heartCountAnimatedValue, {
								toValue: 0,
								speed: 48,
								useNativeDriver: true,
							}).start();
						}, 500);

						Animated.spring(heartCountAnimatedValue, {
							toValue: -40,
							speed: 48,
							useNativeDriver: true,
						}).start();
					}}>
					{heartCount ? (
						<Image style={styles.heartIcon} source={images.heart} />
					) : (
						<Image style={styles.heartIcon} source={images.heartOutline} />
					)}
				</TouchableOpacity>

				<Animated.View
					style={[
						styles.reactionButton,
						styles.heartCountCircle,
						{
							transform: [
								{
									translateY: heartCountAnimatedValue,
								},

								{
									scale: heartCountAnimatedValue.interpolate({
										inputRange: [-40, 0],
										outputRange: [1, 0],
									}),
								},
							],
						},
					]}>
					<Text style={styles.heartCountText}>{heartCount}</Text>
				</Animated.View>

				{hearts.map(({ id }) => (
					<AnimatedHeart key={id} id={id} onCompleteAnimation={handleCompleteAnimation} />
				))}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	messageContainer: {
		flexDirection: 'row',
	},

	messageAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginRight: 8,
	},

	messageContent: {
		width: WINDOW_WIDTH * 0.7,
		backgroundColor: '#0584fe',
		borderRadius: 8,
		padding: 8,
	},

	messageText: {
		fontSize: 20,
		color: 'white',
	},

	reactionButton: {
		position: 'absolute',
		bottom: -8,
		right: -4,
		justifyContent: 'center',
		alignItems: 'center',
	},

	heartButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: 'white',
		...Platform.select({
			android: { elevation: 3 },
			ios: {
				shadowColor: 'grey',
				shadowOpacity: 1,
				shadowRadius: 1,
				shadowOffset: {
					width: 0.5,
					height: 0.5,
				},
			},
		}),
	},

	heartIcon: {
		width: 12,
		height: 12,
	},

	heartCountCircle: {
		width: 32,
		height: 32,
		right: -8,
		borderRadius: 16,
		backgroundColor: 'orange',
		zIndex: 100,
	},

	heartCountText: {
		color: 'white',
	},
});

export default ReactToMessage;
