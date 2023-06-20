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
		width: '45%',
		height: '10%',
		margin: 8,
		borderRadius: 8,
		backgroundColor: '#0584FE',
		alignItems: 'center',
		justifyContent: 'center',
	},

	text: {
		color: 'white',
	},
});
