import { Authorizer } from '../../app/Authorization/Authorizer'
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess';
import { UserCredentialsDbAccess } from '../../app/Authorization/UserCredentialsDbAccess';
import { Account, SessionToken, TokenState } from '../../app/Models/ServerModels';
jest.mock('../../app/Authorization/SessionTokenDBAccess');
jest.mock('../../app/Authorization/UserCredentialsDbAccess')

const someAccount: Account = {
  username: 'someUser',
  password: 'somePassword'
}

describe('Authorizer test suite', () => {
  let authorizer: Authorizer;
  const SessionTokenDBAccessMock = {
    storeSessionToken: jest.fn()
  };
  const UserCredentialsDbAccessMock = {
    getUserCredential: jest.fn()
  };

  beforeEach(() => {
    authorizer = new Authorizer(
      SessionTokenDBAccessMock as any,
      UserCredentialsDbAccessMock as any
    )
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('constructor arguments', () => {
    new Authorizer();
    expect(SessionTokenDBAccess).toBeCalledTimes(1);
    expect(UserCredentialsDbAccess).toBeCalledTimes(1);
  })
  const someAccount: Account =  {
    username: 'someUser',
    password: 'password'
  }

  test('should return sessionToken for valid credentials', async() => {
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0);
    jest.spyOn(global.Date, 'now').mockReturnValueOnce(0);
    UserCredentialsDbAccessMock.getUserCredential.mockResolvedValueOnce({
      username: 'someUser',
      accessRights: [1, 2, 3]
    });
    const expectedSessionToken: SessionToken = {
      userName: 'someUser',
      accessRights:[1, 2, 3],
      valid: true,
      tokenId: '',
      expirationTime: new Date(1000 * 60 * 60)
    }
    const sessionToken = await authorizer.generateToken(someAccount)
    expect(expectedSessionToken).toStrictEqual(sessionToken);
    expect(SessionTokenDBAccessMock.storeSessionToken).toBeCalledWith(sessionToken)
  })
})
