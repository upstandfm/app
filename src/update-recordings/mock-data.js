/**
 * Standup update recordings mock data
 */

export const membersMockData = [
  {
    id: 'auth0|user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Daniël Illouz',
    email: 'daniel@upstand.fm',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/6201287'
  },

  {
    id: 'auth0|user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Eva Green',
    email: 'eva@green.com',
    avatarUrl: ''
  },

  {
    id: 'auth0|user3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Rick Sanchez',
    email: 'rick@gfy.com',
    avatarUrl: ''
  }
];

export const recordingsMockData = [
  {
    id: 'rec1',
    createdBy: 'auth0|user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name:
      'This recording has a very very loooong name with exactly 70 characters',
    transcodingStatus: 'transcoding',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec1.mp3`
  },

  {
    id: 'rec2',
    createdBy: 'auth0|user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'Today',
    transcodingStatus: 'completed',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec2.mp3`
  },

  {
    id: 'rec3',
    createdBy: 'auth0|user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'Blockers',
    transcodingStatus: 'error',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec3.mp3`
  },

  {
    id: 'rec4',
    createdBy: 'auth0|user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'Yesterday',
    transcodingStatus: 'transcoding',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec4.mp3`
  },

  {
    id: 'rec5',
    createdBy: 'auth0|user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'Today',
    transcodingStatus: 'completed',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec5.mp3`
  },

  {
    id: 'rec6',
    createdBy: 'auth0|user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: undefined,
    transcodingStatus: 'error',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec6.mp3`
  }
];
