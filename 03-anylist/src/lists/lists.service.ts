import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SearchArgs } from 'src/common/dto/args/search.args';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    const list = this.listRepository.create({ ...createListInput, user });
    await this.listRepository.save(list);
    return list;
  }

  findAll(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const itemQuery = this.listRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId"=:userId`, { userId: user.id }); //evita inyecciones

    if (search) {
      itemQuery.andWhere(`LOWER(name) like :name`, {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return itemQuery.getMany();
  }

  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listRepository.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!list) throw new NotFoundException(`item with id:${id} not found`);
    return list;
  }

  async update(
    id: string,
    updateListInput: UpdateListInput,
    user: User,
  ): Promise<List> {
    await this.findOne(id, user);
    // console.log(updateListInput);
    const updateList = await this.listRepository.preload(updateListInput);
    return this.listRepository.save(updateList!);
  }

  async remove(id: string, user: User): Promise<List> {
    const list = await this.findOne(id, user);
    await this.listRepository.remove(list);
    return { ...list, id };
  }
}
