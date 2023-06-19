import React, { useRef } from 'react';
import {
	SafeAreaView,
	View,
	TextInput,
	Image,
	StyleSheet,
	ScrollView,
	StatusBar,
	Animated,
	TouchableOpacity,
} from 'react-native';
import { images } from 'assets';
import { getFeatureViewAnimation } from 'utils';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

const HEADER_HEIGHT = UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP + LOWER_HEADER_HEIGHT;

const MomoHeader: React.FC = () => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const scrollViewRef = useRef<ScrollView>(null);
	const lastOffsetY = useRef(0);
	const scrollDirection = useRef('');

	const depositViewAnimation = getFeatureViewAnimation(animatedValue, 36);
	const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, -16);
	const qrViewAnimation = getFeatureViewAnimation(animatedValue, -56);
	const scanViewAnimation = getFeatureViewAnimation(animatedValue, -92);

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

	const featureIconCircleAnimation = {
		opacity: animatedValue.interpolate({
			inputRange: [0, 25],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	};
	const featureNameAnimation = {
		transform: [
			{
				scale: animatedValue.interpolate({
					inputRange: [0, 30],
					outputRange: [1, 0],
					extrapolate: 'clamp',
				}),
			},
		],
		opacity: animatedValue.interpolate({
			inputRange: [0, 30],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	};
	const featureIconAnimation = {
		opacity: animatedValue.interpolate({
			inputRange: [0, 50],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		}),
	};

	const textInputAnimation = {
		transform: [
			{
				scaleX: animatedValue.interpolate({
					inputRange: [0, 50],
					outputRange: [1, 0],
					extrapolate: 'clamp',
				}),
			},
			{
				translateX: animatedValue.interpolate({
					inputRange: [0, 25],
					outputRange: [0, -100],
					extrapolate: 'clamp',
				}),
			},
		],
		opacity: animatedValue.interpolate({
			inputRange: [0, 25],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	};

	// Fixed click feature
	const headerAnimation = {
		height: animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [HEADER_HEIGHT, UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP],
			extrapolate: 'clamp',
		}),
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<SafeAreaView>
				<View style={styles.upperHeaderPlaceholder} />
			</SafeAreaView>

			<SafeAreaView style={styles.header}>
				<Animated.View style={headerAnimation}>
					<View style={styles.upperHeader}>
						<View style={styles.searchContainer}>
							<Image
								source={images.momo.search}
								style={[styles.icon16, { marginLeft: 8 }]}
							/>
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
				</Animated.View>
			</SafeAreaView>

			<ScrollView
				ref={scrollViewRef}
				showsVerticalScrollIndicator={false}
				onScroll={(e) => {
					const offsetY = e.nativeEvent.contentOffset.y;
					scrollDirection.current = offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
					lastOffsetY.current = offsetY;
					animatedValue.setValue(offsetY);
				}}
				onScrollEndDrag={() => {
					scrollViewRef.current?.scrollTo({
						y: scrollDirection.current === 'down' ? 100 : 0,
						animated: true,
					});
				}}
				scrollEventThrottle={16}>
				<View style={styles.spaceForHeader} />
				<View style={styles.scrollViewContent} />
			</ScrollView>
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
