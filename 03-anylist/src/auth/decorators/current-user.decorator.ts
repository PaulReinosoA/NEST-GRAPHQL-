import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], contex: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(contex);
    const user: User = ctx.getContext().req.user;

    //console.log({ 'roles1':roles });
    if (!user) {
      throw new InternalServerErrorException(
        'error interno del servidor, comuniquese con el admin del sistema',
      );
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      // todo eliminar valid roles
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `user ${user.fullName} need valid role [${roles.join(',')}]`,
    );
  },
);
