import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
}
//esto permite que usemos esto en los args de las peticiones
registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'roles permitidos',
});
