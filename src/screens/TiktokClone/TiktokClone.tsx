import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { tiktokTabs } from 'utils';

const Tab = createBottomTabNavigator();

const TiktokClone: React.FC = () => {
	const renderTabBarIcon = (tab: any, focused: any) => {
		return (
			<Image
				source={tab.icon}
				style={[
					tab.special ? styles.newVideoButton : styles.bottomTabIcon,
					focused && styles.bottomTabIconFocused,
				]}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: { backgroundColor: 'black' },
					headerShown: false,
					tabBarActiveTintColor: 'white',
				}}>
				{tiktokTabs.map((tab, index) => (
					<Tab.Screen
						key={index}
						name={tab.name}
						component={tab.component()}
						options={{
							tabBarIcon: ({ focused }) => {
								return renderTabBarIcon(tab, focused);
							},
						}}
					/>
				))}
			</Tab.Navigator>
		</View>
	);
};

export default TiktokClone;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	bottomTabIcon: {
		width: 20,
		height: 20,
		tintColor: 'grey',
	},

	bottomTabIconFocused: {
		tintColor: 'white',
	},

	newVideoButton: {
		width: 48,
		height: 24,
	},
});
