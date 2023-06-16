import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuItem = ({ onPress, label }: any) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.item}>
			<Text style={styles.text}>{label}</Text>
		</TouchableOpacity>
	);
};

export default MenuItem;

const styles = StyleSheet.create({
	item: {
		width: '50%',
		alignItems: 'center',
		padding: 8,
		margin: 8,
		borderRadius: 8,
		backgroundColor: '#0584FE',
	},
	text: {
		color: 'white',
	},
});
