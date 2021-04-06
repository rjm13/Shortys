import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
              ProfileScreen: 'Profile',
              EditProfileScreen: 'EditProfile'
            },
          },
          Stories: {
            screens: {
              StoriesScreen: 'two',
              BrowseAuthor: 'BrowseAuthor',
              BrowseNarrator: 'BrowseNarrator'
            },
          },
          Playlist: {
            screens: {
              PlaylistScreen: 'three',
            },
          },
        },
      },
      RecordAudio: '*',
      AudioPlayer: '*',
      UserScreen: '*',
      SignUp: '*',
      SignIn: '*',
      ForgotPassword: '*',
      ConfirmEmail: '*',
    },
  },
};
