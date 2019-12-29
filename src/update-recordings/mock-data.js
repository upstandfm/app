/**
 * Standup update recordings mock data
 */

export const membersMockData = [
  {
    userId: 'auth0|user1',
    userFullName: 'Daniël Illouz',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/6201287'
  },

  {
    userId: 'auth0|user2',
    userFullName: 'Eva Green',
    avatarUrl: ''
  },

  {
    userId: 'auth0|user3',
    userFullName: 'Rick Sanchez',
    avatarUrl: ''
  }
];

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();
const todayDateKey = `${today.getDate()}-${todayMonth}-${todayYear}`;

export const recordingsMockData = [
  {
    recordingId: 'rec1',
    name: 'Yesterday',
    standupId: 'standup1',
    userId: 'auth0|user1',
    status: 'transcoding',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/rec1.mp3`
  },

  {
    recordingId: 'rec2',
    name: 'Today',
    standupId: 'standup1',
    userId: 'auth0|user1',
    status: 'completed',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/rec2.mp3`
  },

  {
    recordingId: 'rec3',
    name: 'Blockers',
    standupId: 'standup1',
    userId: 'auth0|user1',
    status: 'error',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/rec3.mp3`
  },

  {
    recordingId: 'rec4',
    name: 'Yesterday',
    standupId: 'standup1',
    userId: 'auth0|user2',
    status: 'transcoding',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/rec4.mp3`
  },

  {
    recordingId: 'rec5',
    name: 'Today',
    standupId: 'standup1',
    userId: 'auth0|user2',
    status: 'completed',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/rec5.mp3`
  },

  {
    recordingId: 'rec6',
    name: undefined,
    standupId: 'standup1',
    userId: 'auth0|user2',
    status: 'error',
    createdAt: today.getTime(),
    updatedAt: today.getTime(),
    transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/rec6.mp3`
  }
];
