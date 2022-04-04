import * as axios from 'axios';

axios.default.defaults.validateStatus = function() {
  return true;
}

const serverUrl = 'http://localhost:8080';
describe('Server itest suite', async () => {
  await serverReachable();
})

async function serverReachable(): Promise<boolean> {
  try {
    await axios.default.get(serverUrl);
  } catch (error) {
    console.log('Server not reachable')
    return false;
  }
  console.log('Server reachable')
    return true;
}