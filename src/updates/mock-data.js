/**
 * Standup updates mock data
 */

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();
const todayDateKey = `${today.getDate()}-${todayMonth}-${todayYear}`;

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayMonth = yesterday.getMonth() + 1;
const yesterdayYear = yesterday.getFullYear();
const yesterdayDateKey = `${yesterday.getDate()}-${yesterdayMonth}-${yesterdayYear}`;

export default {
  [todayDateKey]: [
    {
      recordingId: 'rec1',
      filename: 'yesterday',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'transcoding',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/yesterday.mp3`
    },

    {
      recordingId: 'rec2',
      filename: 'today',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'completed',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/today.mp3`
    },

    {
      recordingId: 'rec3',
      filename: 'blockers',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'error',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user1/today.mp3`
    },

    {
      recordingId: 'rec4',
      filename: 'yesterday',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'transcoding',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/yesterday.mp3`
    },

    {
      recordingId: 'rec5',
      filename: 'today',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'completed',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/today.mp3`
    },

    {
      recordingId: 'rec6',
      filename: 'blockers',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'error',
      createdAt: today.getTime(),
      updatedAt: today.getTime(),
      transcodedFileKey: `audio/standups/standup1/${todayDateKey}/auth0|user2/today.mp3`
    }
  ],

  [yesterdayDateKey]: [
    {
      recordingId: 'rec7',
      filename: 'yesterday',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'transcoding',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user1/yesterday.mp3`
    },

    {
      recordingId: 'rec8',
      filename: 'today',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'completed',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user1/today.mp3`
    },

    {
      recordingId: 'rec9',
      filename: 'blockers',
      standupId: 'standup1',
      userId: 'auth0|user1',
      status: 'error',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user1/today.mp3`
    },

    {
      recordingId: 'rec10',
      filename: 'yesterday',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'transcoding',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user2/yesterday.mp3`
    },

    {
      recordingId: 'rec11',
      filename: 'today',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'completed',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user2/today.mp3`
    },

    {
      recordingId: 'rec12',
      filename: 'blockers',
      standupId: 'standup1',
      userId: 'auth0|user2',
      status: 'error',
      createdAt: yesterday.getTime(),
      updatedAt: yesterday.getTime(),
      transcodedFileKey: `audio/standups/standup1/${yesterdayDateKey}/auth0|user2/today.mp3`
    }
  ]
};
