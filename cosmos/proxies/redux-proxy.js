import createReduxProxy from 'react-cosmos-redux-proxy';

// We can import app files here
import { initStore } from 'initStore';

// Read more about configuring Redux in the Redux proxy section below
const ReduxProxy = createReduxProxy({
  createStore: state => initStore(state)
});

export default ReduxProxy;
