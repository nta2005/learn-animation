import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { images } from 'assets';

interface ModalProps {
	title?: string;
	isVisible: boolean;
	onClose: () => void;
	children?: any;
}

const Modal: React.FC<ModalProps> = ({ isVisible, title, children, onClose }) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	const handleClose = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			useNativeDriver: false,
		}).start(() => onClose());
	};

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: isVisible ? 1 : 0,
			useNativeDriver: false,
		}).start();
	}, [animatedValue, isVisible]);

	const containerAnimation = {
		opacity: animatedValue,
	};

	return isVisible ? (
		<Animated.View style={[styles.container, containerAnimation]}>
			<View style={[styles.modal]}>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
						<Image source={images.close} style={styles.iconClose} />
					</TouchableOpacity>
				</View>
			</View>
			{children}
		</Animated.View>
	) : null;
};

export default Modal;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 9999999,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},

	modal: {
		width: '80%',
		height: '90%',
		backgroundColor: 'white',
		borderRadius: 8,
	},

	header: {
		width: '100%',
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	closeBtn: {
		position: 'absolute',
		right: 16,
	},

	iconClose: {
		height: 20,
		width: 20,
	},
});
