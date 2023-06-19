import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { Stacks } from 'common';

enableScreens();

const Stack = createNativeStackNavigator();

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
				{Stacks.map((stack, index) => (
					<Stack.Screen key={index} name={stack.name} component={stack.component} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
