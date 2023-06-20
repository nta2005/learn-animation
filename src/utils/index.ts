import { Dimensions } from 'react-native';
import { images } from 'assets';

export * from './momo';
export * from './tiktok';
export * from './facebook';
export * from './phone';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const userList = [
	{
		id: 0,
		avatar: images.users.girl1,
	},
	{
		id: 1,
		avatar: images.users.girl2,
	},
	{
		id: 2,
		avatar: images.users.girl3,
	},
	{
		id: 3,
		avatar: images.users.girl4,
	},
	{
		id: 4,
		avatar: images.users.girl5,
	},
];

const dummyData: Dummy[] = [];

for (let i = 0; i < 50; i++) {
	dummyData.push({
		id: i,
	});
}

export { WINDOW_HEIGHT, WINDOW_WIDTH, userList, dummyData };
