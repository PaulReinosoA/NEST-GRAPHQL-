import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SEED_USERS, SEED_ITEMS } from './data/seed-data';
import { ItemsService } from 'src/items/items.service';
import { ListItem } from 'src/list-item/entities/list-item.entity';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usesrRepository: Repository<User>,

    private readonly userService: UserService,
    private readonly itemsService: ItemsService,
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

    return true;
  }

  async deleteDatabase() {
    await this.listItemRepository.createQueryBuilder().delete().where({}).execute();
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
}
