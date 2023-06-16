import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { Stacks } from 'common';
import { HomeScreen, MomoHeader, TiktokClone, DoubleTapToHeart, ReactToMessage } from 'screens';

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
				<Stack.Screen name={Stacks.Home} component={HomeScreen} />
				<Stack.Screen name={Stacks.MomoHeader} component={MomoHeader} />
				<Stack.Screen name={Stacks.TiktokClone} component={TiktokClone} />
				<Stack.Screen name={Stacks.DoubleTapToHeart} component={DoubleTapToHeart} />
				<Stack.Screen name={Stacks.ReactToMessage} component={ReactToMessage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
