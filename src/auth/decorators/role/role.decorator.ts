import { SetMetadata } from "@nestjs/common";
import {RoleType} from "@prisma/client";

export const Role_NAME = "role-name";

export type RoleValue = RoleType[] | "*"; 

export const Role = (value:RoleValue=[])=>SetMetadata(Role_NAME,value);
