import { Usuario } from '@prisma/client';

type SafeUser = Omit<Usuario, 'contrasenaHash'> & { roles: string[] };

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}
