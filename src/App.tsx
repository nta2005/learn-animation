import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from 'navigation';

const App: React.FC = () => {
	return (
		<SafeAreaProvider>
			<AppStack />
		</SafeAreaProvider>
	);
};

export default App;
