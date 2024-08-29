export interface IVideo {
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  createdBy: {
    username: string;
    avatar: string;
  };
}
