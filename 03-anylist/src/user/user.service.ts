import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SingUpInput } from 'src/auth/dto/inputs/singup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(singUpInput: SingUpInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...singUpInput,
        password: bcrypt.hashSync(singUpInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('algo salio mal');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email: email });
    } catch (error) {
      throw new NotFoundException(`not found email:${email}`);

      //this.handleExceptions({code:'error-001',detail:`${email} not found error${error}`});
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  // update(id: number, updateUserInput: UpdateUserInput){
  //   return `This action updates a #${id} user`;
  // }

  async block(id: string): Promise<User> {
    throw new Error(`method not implemented, Id sent: ${id}`);
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }
    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }
    this.logger.error(error);
    throw new InternalServerErrorException(`Please check server logs`);
  }
}
