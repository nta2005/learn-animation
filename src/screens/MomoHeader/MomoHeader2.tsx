import React from 'react';
import {
	SafeAreaView,
	View,
	TextInput,
	Image,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
} from 'react-native';

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	useAnimatedScrollHandler,
	useAnimatedRef,
	scrollTo,
} from 'react-native-reanimated';

import { images } from 'assets';
import { useFeatureViewAnimation } from 'utils';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

const HEADER_HEIGHT = UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP + LOWER_HEADER_HEIGHT;

const MomoHeader: React.FC = () => {
	const animatedValue = useSharedValue(0);
	const scrollViewRef = useAnimatedRef<any>();
	const lastOffsetY = useSharedValue(0);
	const scrollDirection = useSharedValue('');

	const depositViewAnimation = useFeatureViewAnimation(animatedValue, 36);
	const withdrawViewAnimation = useFeatureViewAnimation(animatedValue, -16);
	const qrViewAnimation = useFeatureViewAnimation(animatedValue, -56);
	const scanViewAnimation = useFeatureViewAnimation(animatedValue, -92);

	const FEATURE_LIST = [
		{
			name: 'NẠP TIỀN',
			icon: images.momo.deposit,
			iconCircle: images.momo.depositCircle,
			animation: depositViewAnimation,
			press: () => handleDeposit(),
		},
		{
			name: 'RÚT TIỀN',
			icon: images.momo.withdraw,
			iconCircle: images.momo.withdrawCircle,
			animation: withdrawViewAnimation,
			press: () => handleWithdraw(),
		},
		{
			name: 'MÃ QR',
			icon: images.momo.qr,
			iconCircle: images.momo.qrCircle,
			animation: qrViewAnimation,
			press: () => handleQR(),
		},
		{
			name: 'QUÉT MÃ',
			icon: images.momo.scan,
			iconCircle: images.momo.scanCircle,
			animation: scanViewAnimation,
			press: () => handleScan(),
		},
	];

	const handleDeposit = () => {
		console.log('handleDeposit');
	};

	const handleWithdraw = () => {
		console.log('handleWithDraw');
	};

	const handleQR = () => {
		console.log('handleQR');
	};

	const handleScan = () => {
		console.log('handleScan');
	};

	const featureIconCircleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animatedValue.value, [0, 25], [1, 0], Extrapolate.CLAMP),
		};
	});

	const featureNameAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(animatedValue.value, [0, 30], [1, 0], Extrapolate.CLAMP),
				},
			],
			opacity: interpolate(animatedValue.value, [0, 30], [1, 0], Extrapolate.CLAMP),
		};
	});

	const featureIconAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animatedValue.value, [0, 50], [0, 1], Extrapolate.CLAMP),
		};
	});

	const textInputAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scaleX: interpolate(animatedValue.value, [0, 50], [1, 0], Extrapolate.CLAMP),
				},
				{
					translateX: interpolate(animatedValue.value, [0, 25], [0, -100], Extrapolate.CLAMP),
				},
			],
			opacity: interpolate(animatedValue.value, [0, 25], [1, 0], Extrapolate.CLAMP),
		};
	});

	// Fixed click feature
	const headerAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				animatedValue.value,
				[0, 100],
				[HEADER_HEIGHT, UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP],
				Extrapolate.CLAMP
			),
		};
	});

	const handleScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			const offsetY = event.contentOffset.y;
			scrollDirection.value = offsetY - lastOffsetY.value > 0 ? 'down' : 'up';
			lastOffsetY.value = offsetY;
			animatedValue.value = offsetY;
		},
	});

	const handleScrollEndDrag = useAnimatedScrollHandler({
		onEndDrag: () => {
			scrollTo(scrollViewRef, 0, scrollDirection.value === 'down' ? 100 : 0, true);
		},
	});

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<SafeAreaView>
				<View style={styles.upperHeaderPlaceholder} />
			</SafeAreaView>

			<AnimatedSafeAreaView style={[styles.header, headerAnimation]}>
				<View style={styles.upperHeader}>
					<View style={styles.searchContainer}>
						<Image source={images.momo.search} style={styles.icon16} />
						<AnimatedTextInput
							placeholder="Tìm kiếm"
							placeholderTextColor="rgba(255, 255, 255, 0.8)"
							style={[styles.searchInput, textInputAnimation]}
						/>
					</View>

					<Image source={images.momo.bell} style={styles.bell} />
					<Image source={images.momo.avatar} style={styles.avatar} />
				</View>

				<View style={styles.lowerHeader}>
					{FEATURE_LIST.map((feature, index) => (
						<TouchableOpacity key={index} onPress={feature.press}>
							<Animated.View style={[styles.feature, feature.animation]}>
								<Animated.Image
									source={feature.icon}
									style={[styles.featureIcon, featureIconAnimation]}
								/>

								<Animated.Image
									source={feature.iconCircle}
									style={[styles.icon32, featureIconCircleAnimation]}
								/>

								<Animated.Text style={[styles.featureName, featureNameAnimation]}>
									{feature.name}
								</Animated.Text>
							</Animated.View>
						</TouchableOpacity>
					))}
				</View>
			</AnimatedSafeAreaView>

			<Animated.ScrollView
				ref={scrollViewRef}
				showsVerticalScrollIndicator={false}
				onScroll={handleScroll}
				onScrollEndDrag={handleScrollEndDrag}
				scrollEventThrottle={16}>
				<View style={styles.spaceForHeader} />
				<View style={styles.scrollViewContent} />
			</Animated.ScrollView>
		</View>
	);
};

export default MomoHeader;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	icon16: {
		width: 16,
		height: 16,
		marginLeft: 8,
	},

	icon32: {
		width: 32,
		height: 32,
	},

	upperHeaderPlaceholder: {
		height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
		paddingTop: UPPER_HEADER_PADDING_TOP,
	},

	header: {
		position: 'absolute',
		width: '100%',
		backgroundColor: '#AF0C6E',

		// Fixed click feature
		zIndex: 100,
	},

	upperHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
		paddingTop: UPPER_HEADER_PADDING_TOP,
	},

	searchContainer: {
		flex: 1,
		justifyContent: 'center',
	},

	featureIcon: {
		width: 16,
		height: 16,
		position: 'absolute',
		top: 8,
	},

	bell: {
		width: 16,
		height: 16,
		marginHorizontal: 32,
	},

	avatar: {
		width: 28,
		height: 28,
	},

	lowerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: LOWER_HEADER_HEIGHT,
		paddingHorizontal: 16,
	},

	searchInput: {
		position: 'absolute',
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		color: 'white',
		borderRadius: 4,
		paddingVertical: 4,
		paddingLeft: 32,
	},

	feature: {
		alignItems: 'center',
	},

	featureName: {
		fontWeight: 'bold',
		fontSize: 12,
		lineHeight: 14,
		color: '#FFFFFF',
		marginTop: 12,
	},

	spaceForHeader: {
		height: LOWER_HEADER_HEIGHT,
	},

	scrollViewContent: {
		height: 1000,
		backgroundColor: 'white',
	},
});
