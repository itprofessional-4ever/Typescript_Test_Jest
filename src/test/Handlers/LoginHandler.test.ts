import { isJSDocUnknownTag } from 'typescript';
import { LoginHandler } from '../../app/Handlers/LoginHandler'
import { HTTP_CODES, HTTP_METHODS } from '../../app/Models/ServerModels';


describe('LoginHandler test suite', () => {
  let logingHandler: LoginHandler;

  const requestMock = {
    method: ''
  };
  const responseMock = {
    writeHead: jest.fn()
  };
  const authorizerMock = {};

  beforeEach(() => {
    logingHandler = new LoginHandler(
      requestMock as any,
      responseMock as any,
      authorizerMock as any
    )
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('options request', async () => {
    requestMock.method = HTTP_METHODS.OPTIONS;
    await logingHandler.handleRequest();
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK)
  })

  test('not handled http method', async () => {
    responseMock.writeHead.mockClear();
    requestMock.method = 'someRandomMethod';
    await logingHandler.handleRequest();
    expect(responseMock.writeHead).not.toHaveBeenCalled();
  })
})