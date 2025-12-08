import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { Repository } from 'typeorm';
import { List } from 'src/lists/entities/list.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  create(createListItemInput: CreateListItemInput) {
    const { itemId, listId, ...rest } = createListItemInput;
    const newListItem = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });
    return this.listItemRepository.save(newListItem);
  }

  findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const itemQuery = this.listItemRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"listId"=:listId`, { listId: list.id }); //evita inyecciones

    if (search) {
      itemQuery.andWhere(`LOWER(name) like :name`, {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return itemQuery.getMany();
  }

  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id });
    if (!listItem)
      throw new NotFoundException(`List item with id ${id} not found`);
    return listItem;
  }

  async update(
    id: string,
    updateListItemInput: UpdateListItemInput,
  ): Promise<ListItem> {
    const { listId, itemId, ...rest } = updateListItemInput;
    // const listItem = await this.listItemRepository.preload({
    //   ...rest,
    //   list: { id: listId },
    //   item: { id: itemId },
    // });

    // if (!listItem) throw new NotFoundException(`item with id:${id} not found`);

    // return this.listItemRepository.save(listItem);
    const queryBuilder = this.listItemRepository
      .createQueryBuilder()
      .update()
      .set({
        ...rest,
        ...(listId && { list: { id: listId } }),
        ...(itemId && { item: { id: itemId } }),
      })
      .where('id = :id', { id });

    await queryBuilder.execute();
    return this.findOne(id);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} listItem`;
  // }

  async countListItemByList(list: List): Promise<number> {
    return this.listItemRepository.count({
      where: { list: { id: list.id } },
    });
  }
}
