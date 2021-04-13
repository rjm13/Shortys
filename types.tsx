export type RootStackParamList = {
  Root: undefined;
  RecordAudio: undefined;
  AudioPlayer: undefined;
  UserScreen: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ConfirmEmail: undefined;
  UploadAudio: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Stories: undefined;
  Playlist: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  NotificationSetting: undefined;
  Narrations: undefined;
  History: undefined;
  Following: undefined;
};

export type TabTwoParamList = {
  StoriesScreen: undefined;
  BrowseAuthor: undefined;
  BrowseNarrator: undefined;
};

export type TabThreeParamList = {
  PlaylistScreen: undefined;
};

export type ItemParamList = {
  //title: string;

};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  bio: String;
  email: String;
}

declare const awsmobile: {};
export default awsmobile;
