import reducer from './reducer';

describe('snackbar reducer', () => {
  it('enqueues message', () => {
    const state = [];

    const msg = {
      type: 'error',
      title: 'Test message',
      text: 'This is a test message.'
    };
    const action = {
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: msg
    };

    const newState = reducer(state, action);
    const [enqueuedMsg] = newState;
    expect(enqueuedMsg).toHaveProperty('id');
    expect(enqueuedMsg).toHaveProperty('type', msg.type);
    expect(enqueuedMsg).toHaveProperty('title', msg.title);
    expect(enqueuedMsg).toHaveProperty('text', msg.text);
  });

  it('dequeues message', () => {
    const msg = {
      id: '1',
      title: 'Test message',
      text: 'This is a test message.'
    };

    const state = [msg];

    const action = {
      type: 'DEQUEUE_SNACKBAR_MSG',
      data: msg.id
    };

    const newState = reducer(state, action);
    expect(newState).not.toContain(msg);
  });

  it('returns default state', () => {
    const state = [];

    const action = {
      type: 'DOES_NOT_EXIST',
      data: 1
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
