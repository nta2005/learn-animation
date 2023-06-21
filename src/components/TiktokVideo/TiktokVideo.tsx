import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { WINDOW_HEIGHT, tiktokVideos } from 'utils';

import VideoPlayer from './VideoPlayer';

const TiktokVideo = () => {
	const [activeVideoIndex, setActiveVideoIndex] = useState(0);

	const bottomTabHeight = useBottomTabBarHeight();

	return (
		<FlatList
			data={tiktokVideos}
			pagingEnabled
			showsVerticalScrollIndicator={false}
			renderItem={({ item, index }: any) => {
				return <VideoPlayer key={index} data={item} isActive={activeVideoIndex === index} />;
			}}
			onScroll={(e) => {
				const index = Math.round(
					e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
				);
				setActiveVideoIndex(index);
			}}
		/>
	);
};

export default TiktokVideo;
