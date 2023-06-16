import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { Stacks } from 'common';
import { MenuItem } from 'components';

const Home: React.FC = ({ navigation }: any) => {
	const { navigate } = navigation;
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				{Object.keys(Stacks)
					.slice(1)
					.map((stack: any, index: number) => (
						<MenuItem key={index} onPress={() => navigate(stack)} label={stack} />
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},

	scrollView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;
