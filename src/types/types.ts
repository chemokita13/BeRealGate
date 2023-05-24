// API response
export type ApiResponse = {
    status: number; // HTTP status code
    message: string; // HTTP status msg
    data?: any; // Data returned if is necessary
};

// Post types
export interface FriendsFeed {
    userPosts: UserPosts;
    friendsPosts: FriendsPost[];
    remainingPosts: number;
    maxPostsPerMoment: number;
}
export interface UserPosts {
    user: User;
    region: string;
    momentId: string;
    posts: Post[];
}
export interface User {
    id: string;
    username: string;
    profilePicture: ProfilePictureOrMediaOrPrimaryOrSecondary;
}
export interface ProfilePictureOrMediaOrPrimaryOrSecondary {
    url: string;
    width: number;
    height: number;
}
export interface RealMojisEntity {
    id: string;
    user: User;
    media: ProfilePictureOrMediaOrPrimaryOrSecondary;
    type: string;
    emoji: string;
    isInstant: boolean;
    postedAt: string;
}
export interface FriendsPost {
    user: User1;
    momentId: string;
    region: string;
    posts: Post[];
}
export interface User1 {
    id: string;
    username: string;
    profilePicture?: ProfilePictureOrMediaOrPrimaryOrSecondary1 | null;
}
export interface ProfilePictureOrMediaOrPrimaryOrSecondary1 {
    url: string;
    width: number;
    height: number;
}
export interface Post {
    id: string;
    primary: ProfilePictureOrMediaOrPrimaryOrSecondary;
    secondary: ProfilePictureOrMediaOrPrimaryOrSecondary;
    location: Location | null;
    caption: string | null;
    retakeCounter: number;
    lateInSeconds: number;
    isLate: boolean;
    isMain: boolean;
    takenAt: string;
    realMojis: RealMojisEntity1[];
    comments: CommentsEntity[];
    creationDate: string;
    updatedAt: string;
    music?: Music | null;
}
export interface Location {
    latitude: number;
    longitude: number;
}
export interface RealMojisEntity1 {
    id: string;
    user: User;
    media: ProfilePictureOrMediaOrPrimaryOrSecondary;
    type: string;
    emoji: string;
    isInstant: boolean;
    postedAt: string;
}
export interface CommentsEntity {
    id: string;
    user: User1;
    content: string;
    postedAt: string;
}
export interface Music {
    isrc: string;
    track: string;
    artist: string;
    artwork: string;
    provider: string;
    visibility: string;
    providerId: string;
    openUrl: string;
    audioType: string;
}

// PostData to submit
export type PostData = {
    resize?: boolean;

    late?: boolean;

    visibility: string;

    retakes?: number;

    caption?: string;

    taken_at?: string;

    location?: [number, number];
};
