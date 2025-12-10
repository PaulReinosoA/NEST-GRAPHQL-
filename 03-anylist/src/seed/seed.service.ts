import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SEED_USERS, SEED_ITEMS, SEED_LISTS } from './data/seed-data';
import { ItemsService } from 'src/items/items.service';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { List } from 'src/lists/entities/list.entity';
import { ListsService } from 'src/lists/lists.service';
import { ListItemService } from 'src/list-item/list-item.service';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usesrRepository: Repository<User>,

    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,

    @InjectRepository(List)
    private readonly listRepository: Repository<List>,

    private readonly userService: UserService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
    private readonly listsItemService: ListItemService,
  ) {
    this.isProd = this.configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    //todo: limpiar DB
    if (this.isProd) {
      throw new Error('No se puede ejecutar el seed en produccion');
    }
    await this.deleteDatabase();

    //todo: construir usuarios
    await this.loadUser();

    //todo: construir items
    await this.loadItems();

    //TODO: construir listas
    const list = await this.loadLists();

    //TODO: construir list-items
    const user = await this.userService.findOneByEmail(SEED_USERS[0].email);
    const items = await this.itemsService.findAll(
      user,
      { limit: 15, offset: 0 },
      {},
    );
    await this.loadListItems(list, items);

    return true;
  }

  async deleteDatabase() {
    await this.listItemRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.listRepository.createQueryBuilder().delete().where({}).execute();

    await this.itemRepository.createQueryBuilder().delete().where({}).execute();

    await this.usesrRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUser(): Promise<User> {
    const users: User[] = [];
    for (const user of SEED_USERS) {
      users.push(await this.userService.create(user));
    }
    return users[0];
  }

  async loadItems() {
    const user = await this.userService.findOneByEmail(SEED_USERS[0].email);
    const items: Promise<Item>[] = [];
    for (const item of SEED_ITEMS) {
      items.push(this.itemsService.create(item, user));
    }
    await Promise.all(items);
  }

  async loadLists(): Promise<List> {
    const user = await this.userService.findOneByEmail(SEED_USERS[0].email);
    const lists: Promise<List>[] = [];
    for (const list of SEED_LISTS) {
      lists.push(this.listsService.create(list, user));
    }
    await Promise.all(lists);
    return lists[0];
  }

  async loadListItems(list: List, items: Item[]) {
    for (const item of items) {
      await this.listsItemService.create({
        quantity: Math.round(Math.random() * 10) + 1,
        completed: Math.round(Math.random()) === 1 ? true : false,
        listId: list.id,
        itemId: item.id,
      });
    }
  }
}
