// API response
export type ApiResponse = {
    status: number; // HTTP status code
    message: string; // HTTP status msg
    data?: any; // Data returned if is necessary
};

// Post types
export type Post = {
    id: string;
    bucket: string;
    caption: string;
    creationDate: CreationDate;
    imageHeight: number;
    imageWidth: number;
    isPublic: boolean;
    lateInSeconds: number;
    mediaType: string;
    members: string[];
    music: Music;
    notificationID: string;
    ownerID: string;
    photoURL: string;
    region: string;
    comment: Comment[];
    realMojis: RealMoji[];
    screenshots: any[];
    screenshotsV2: any[];
    retakeCounter: number;
    secondaryImageHeight: number;
    secondaryImageWidth: number;
    secondaryPhotoURL: string;
    takenAt: CreationDate;
    updatedAt: number;
    user: User;
    userName: string;
};

export type Comment = {
    id: string;
    uid: string;
    userName: string;
    user: User;
    text: string;
    creationDate: CreationDate;
};

export type CreationDate = {
    _seconds: number;
    _nanoseconds: number;
};

export type User = {
    id: string;
    username: string;
    profilePicture: ProfilePicture;
};

export type ProfilePicture = {
    url: string;
    width: number;
    height: number;
};

export type Music = {
    isrc: string;
    openUrl: string;
    visibility: string;
    track: string;
    artist: string;
    provider: string;
    providerId: string;
    artwork: string;
    audioType: string;
};

export type RealMoji = {
    id: string;
    uid: string;
    userName: string;
    user: User;
    date: CreationDate;
    emoji: string;
    type: string;
    uri: string;
};
