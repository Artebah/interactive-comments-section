export interface IUserImage {
  png: string;
  webp: string;
}

export type IUserUsername = string;

export interface IUser {
  image: IUserImage;
  username: IUserUsername;
}
