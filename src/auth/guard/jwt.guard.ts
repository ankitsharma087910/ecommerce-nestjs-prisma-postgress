import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_SKIP_JWT } from "../decorators/jwt/skip-jwt.decorator";



@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
    constructor(private reflector:Reflector){
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isSkipJwt = this.reflector.getAllAndOverride(IS_SKIP_JWT,[context.getClass(),context.getHandler()]);
        if(isSkipJwt)
            return true;

        return super.canActivate(context);
    }
}