/**
 * Standup update recordings mock data
 */

const nowIso = new Date().toISOString();

export const membersByIdMockData = {
  'auth|user1': {
    id: 'auth|user1',
    createdAt: nowIso,
    updatedAt: nowIso,
    fullName: 'Daniël Illouz',
    email: 'daniel@upstand.fm',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/6201287'
  },

  'auth|user2': {
    id: 'auth|user2',
    createdAt: nowIso,
    updatedAt: nowIso,
    fullName: 'Eva Green',
    email: 'eva@green.com',
    avatarUrl: ''
  },

  'auth|user3': {
    id: 'auth|user3',
    createdAt: nowIso,
    updatedAt: nowIso,
    fullName: 'Rick Sanchez',
    email: 'rick@gfy.com',
    avatarUrl: ''
  }
};

export const recordingsMockData = [
  {
    id: 'rec1',
    createdBy: 'auth|user1',
    createdAt: nowIso,
    updatedAt: nowIso,
    name:
      'This recording has a very very loooong name with exactly 70 characters',
    transcodingStatus: 'transcoding',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec1.mp3`
  },

  {
    id: 'rec2',
    createdBy: 'auth|user1',
    createdAt: nowIso,
    updatedAt: nowIso,
    name: 'Today',
    transcodingStatus: 'completed',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec2.mp3`
  },

  {
    id: 'rec3',
    createdBy: 'auth|user1',
    createdAt: nowIso,
    updatedAt: nowIso,
    name: 'Blockers',
    transcodingStatus: 'error',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec3.mp3`
  },

  {
    id: 'rec4',
    createdBy: 'auth|user2',
    createdAt: nowIso,
    updatedAt: nowIso,
    name: 'Yesterday',
    transcodingStatus: 'transcoding',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec4.mp3`
  },

  {
    id: 'rec5',
    createdBy: 'auth|user2',
    createdAt: nowIso,
    updatedAt: nowIso,
    name: 'Today',
    transcodingStatus: 'completed',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec5.mp3`
  },

  {
    id: 'rec6',
    createdBy: 'auth|user2',
    createdAt: nowIso,
    updatedAt: nowIso,
    name: undefined,
    transcodingStatus: 'error',
    transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/rec6.mp3`
  }
];
