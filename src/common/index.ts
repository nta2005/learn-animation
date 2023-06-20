/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	MomoHeader,
	TiktokClone,
	DoubleTapToHeart,
	ReactToMessage,
	DraggableBottomSheet,
	AnimatedBannerWithSearchInput,
	CubeCarousel,
	FacebookPostReaction,
	MessengerInput,
	PickPhoneColor,
	SwipeableList,
	TikTokMusicDisc,
	Tinder,
	ZingCarousel,
	ZoomableImage,
	Tarot,
	CoffeeSlider,
} from 'screens';

export const Stacks = [
	{ name: 'MoMo Header', component: MomoHeader },
	{ name: 'Tiktok Clone', component: TiktokClone },
	{ name: 'Double Tap To Heart', component: DoubleTapToHeart },
	{ name: 'React To Message', component: ReactToMessage },
	{ name: 'Draggable BottomSheet', component: DraggableBottomSheet },
	{ name: 'Animated Banner With SearchInput', component: AnimatedBannerWithSearchInput },
	{ name: 'Cube Carousel', component: CubeCarousel },
	{ name: 'Facebook Post Reaction', component: FacebookPostReaction },
	{ name: 'Messenger Input', component: MessengerInput },
	{ name: 'Modal', component: null, type: 'modal' },
	{ name: 'Pick Phone Color', component: PickPhoneColor },
	{ name: 'Swipeable List', component: SwipeableList }, // have some bug
	{ name: 'TikTok Music Disc', component: TikTokMusicDisc },
	{ name: 'Tinder', component: Tinder },
	{ name: 'Zing Carousel', component: ZingCarousel }, // have some bug
	{ name: 'Zoomable Image', component: ZoomableImage },
	// { name: 'Tarot', component: Tarot }, // pending
	// { name: 'Coffee Slider', component: CoffeeSlider }, // pending
];
