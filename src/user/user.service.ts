import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaORM/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import {genSaltSync,hashSync} from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async createUser(body: CreateUserDto) {
    const { name, email, password } = body;

    const isUserExist = await this.prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
      throw new Error('email id already exist');
    }

    console.log(typeof this.config.get('BCRYPT_SALT_ROUNDS'));
    // hash the password
    const saltRounds =  genSaltSync(
      this.config.get('BCRYPT_SALT_ROUNDS'),
    );
   
    const hashPassword = await hashSync(password, saltRounds);

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password:hashPassword
      },
    });

  }
}
