import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PrismaService } from "src/prismaORM/prisma.service";
import { Role_NAME, RoleValue } from "../decorators/role/role.decorator";



@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly prisma:PrismaService,private readonly reflector:Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const validRoles = this.reflector.getAllAndOverride<RoleValue>(Role_NAME,[context.getClass(),context.getHandler()]);

        if(!request?.user?.id){
            throw new UnauthorizedException("User is not authorized")
        }
        if(validRoles === "*"){
            return true;
        }

        return await this.prisma.user.findUnique({
            where:{
                id:request.user.id
            },
            select:{
                role:true
            }
        }).then((user)=>{
            if(!user){
                throw new UnauthorizedException("user is not authorized with this id");
            }else{
                const validRolesSet = new Set(validRoles);
                const hasRole = user?.role?.some(role => validRolesSet.has(role));
                if(!hasRole){
                    throw new UnauthorizedException("this role is authorized")
                }
            }
            return true;
        }).catch((err)=>{
            throw new UnauthorizedException(err.message);
        })
    }

}