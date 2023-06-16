import { Dimensions } from 'react-native';

export * from './momo';
export * from './tiktok';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export { WINDOW_HEIGHT, WINDOW_WIDTH };
