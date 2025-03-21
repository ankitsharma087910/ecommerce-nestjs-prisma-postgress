import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(private readonly config : ConfigService,private readonly userService :UserService){}

    @Post()
    @ApiOperation({summary:"Create a new user"})
    @ApiCreatedResponse({description:"User created successfully",type:CreateUserDto})
    @ApiConflictResponse({description:"Email already exist"})
    async createUser(@Body() body : CreateUserDto){
       const user = await this.userService.createUser(body);
       return user;
    }
}
