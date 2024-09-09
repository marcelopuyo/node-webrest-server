import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server'

jest.mock('../src/presentation/server');

describe('Debe llamarse al server con argumentos y arrancar', () => {
  test('Debe funcionar', async () => {
    
    
    await import('../src/app');

    expect(Server).toHaveBeenCalledTimes(1);
    
    expect(Server).toHaveBeenCalledWith({
      PORT: envs.PORT,
      PUBLIC_PATH: envs.PUBLIC_PATH,
      routes: expect.any(Function)
    });

    expect(Server.prototype.start).toHaveBeenCalled();
    
  })
});