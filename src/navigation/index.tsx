import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { Stacks } from 'common';
import { MenuItem } from 'components';

enableScreens();

const Stack = createNativeStackNavigator();

const Home: React.FC = ({ navigation }: any) => {
	const { navigate } = navigation;
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				{Stacks.map((stack: any, index: number) => (
					<MenuItem key={index} onPress={() => navigate(stack)} label={stack.name} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const AppStack: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerBackTitle: '',
					animation: 'slide_from_right',
					animationDuration: 300,
					header: () => null,
				}}>
				<Stack.Screen name={'Home'} component={Home} />

				{Stacks.map((stack, index) => (
					<Stack.Screen key={index} name={stack.name} component={stack.component} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;

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
