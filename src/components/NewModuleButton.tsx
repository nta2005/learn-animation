import React from 'react';
import { Button } from 'react-native';

import { CalendarModule } from 'native-modules';

const NewModuleButton = () => {
	const onPress = () => {
		console.log('We will invoke the native module here!');
		CalendarModule.createCalendarEvent('testName', 'testLocation');
	};

	return <Button title="Click to invoke your native module!" color="#841584" onPress={onPress} />;
};

export default NewModuleButton;
