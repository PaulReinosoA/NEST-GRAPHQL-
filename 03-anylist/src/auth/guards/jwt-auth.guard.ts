import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  //! override
  getRequest(context: ExecutionContext):any {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    //console.log({request})
    return request;
  }
}
