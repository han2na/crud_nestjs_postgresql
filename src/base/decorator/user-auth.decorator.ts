import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? request?.[data] : user;
  },
);
