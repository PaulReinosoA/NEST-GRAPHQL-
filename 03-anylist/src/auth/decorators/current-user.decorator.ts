import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (roles = [], contex: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(contex);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'error interno del servidor, comuniquese con el admin del sistema',
      );
    }
    return user;
  },
);
