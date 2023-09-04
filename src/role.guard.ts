import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class RoleGuard implements CanActivate {

    private rolePassed: string[];

    constructor(role: string[]) {
        this.rolePassed = role;
    }

    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const request: any = ctx.getRequest<Request>();
        const userRole = request.user.role;
        if (!this.rolePassed.includes(userRole)) {
            throw new UnauthorizedException();
        }

        return true;

    }
}