import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { Stacks } from 'common';
import { MenuItem, Modal, NoneComponent, NewModuleButton } from 'components';

enableScreens();

const Stack = createNativeStackNavigator();

const Home: React.FC = ({ navigation }: any) => {
	const [visibleModal, setVisibleModal] = useState(false);

	const handlePress = (stack: any) => {
		switch (stack.type) {
			case 'modal':
				return setVisibleModal(!visibleModal);

			default:
				return navigation.navigate(stack);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				{Stacks.map((stack: any, index: number) => (
					<MenuItem key={index} onPress={() => handlePress(stack)} label={stack.name} />
				))}

				<NewModuleButton />

				<Modal isVisible={visibleModal} onClose={() => setVisibleModal(false)} />
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
					<Stack.Screen
						key={index}
						name={stack.name}
						component={stack.component ?? NoneComponent}
					/>
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
		flexGrow: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
