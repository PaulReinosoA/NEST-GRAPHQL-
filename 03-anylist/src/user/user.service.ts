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
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/update-user.input';

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
      throw new NotFoundException(`not found email:${email}, error: ${error}`);

      //this.handleExceptions({code:'error-001',detail:`${email} not found error${error}`});
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${id} not found, error: ${error}`);
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0)
      return await this.usersRepository.find({
        relations: { lastUpdateBy: true }, //ya no es necesario poir el lazy para relaciones
      });

    // roles...
    return await this.usersRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<User> {
    try {
      this.findOneById(id);

      // const userUpdated: User = {
      //   ...updateUserInput,
      //   lastUpdateBy: user,
      // };
      const userDb = await this.usersRepository.preload({
        ...updateUserInput,
        lastUpdateBy: user,
      });
      return this.usersRepository.save(userDb!);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async block(id: string, user: User): Promise<User> {
    const userBlock = await this.findOneById(id);
    userBlock.isActive = false;
    userBlock.lastUpdateBy = user;
    return await this.usersRepository.save(userBlock);
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
