import { images } from 'assets';
import { TiktokVideo } from 'components';

const getMusicNoteAnimation = (animationValue: any, isRorateLeft: boolean) => {
	return {
		transform: [
			{
				translateX: animationValue.interpolate({
					inputRange: [0, 1],
					outputRange: [8, -16],
				}),
			},
			{
				translateY: animationValue.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -32],
				}),
			},
			{
				rotate: animationValue.interpolate({
					inputRange: [0, 1],
					outputRange: ['0deg', isRorateLeft ? '-45deg' : '45deg'],
				}),
			},
		],

		opacity: animationValue.interpolate({
			inputRange: [0, 0.8, 1],
			outputRange: [0, 1, 0],
		}),
	};
};

const tiktokTabs = [
	{
		name: 'Home',
		component: () => TiktokVideo,
		icon: images.tiktok.home,
		special: false,
	},
	{
		name: 'Discover',
		component: () => TiktokVideo,
		icon: images.tiktok.search,
		special: false,
	},
	{
		name: 'NewVideo',
		component: () => TiktokVideo,
		icon: images.tiktok.newVideo,
		special: true,
	},
	{
		name: 'Inbox',
		component: () => TiktokVideo,
		icon: images.tiktok.message,
		special: false,
	},
	{
		name: 'Profile',
		component: () => TiktokVideo,
		icon: images.tiktok.user,
		special: false,
	},
];

const tiktokVideos = [
	{
		id: 1,
		channelName: 'cutedog',
		uri: 'https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4',
		caption: 'Cute dog shaking hands #cute #puppy',
		musicName: 'Song #1',
		likes: 4321,
		comments: 2841,
		avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
	},
	{
		id: 2,
		channelName: 'meow',
		uri: 'https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4',
		caption: 'Doggies eating candy #cute #puppy',
		musicName: 'Song #2',
		likes: 2411,
		comments: 1222,
		avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
	},
	{
		id: 3,
		channelName: 'yummy',
		uri: 'https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4',
		caption: 'Brown little puppy #cute #puppy',
		musicName: 'Song #3',
		likes: 3100,
		comments: 801,
		avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
	},
];

export { tiktokTabs, tiktokVideos, getMusicNoteAnimation };
