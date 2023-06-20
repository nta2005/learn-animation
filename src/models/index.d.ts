interface VideoModel {
	id: number;
	channelName: string;
	uri: string;
	caption: string;
	musicName: string;
	likes: number;
	comments: number;
	avatarUri: string;
}

interface UserModel {
	id: number;
	avatar: string;
}

interface Dummy {
	id: number;
}
