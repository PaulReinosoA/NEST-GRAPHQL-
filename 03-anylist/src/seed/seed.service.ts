import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usesrRepository: Repository<User>,
  ) {
    this.isProd = this.configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    //todo: limpiar DB
    if (this.isProd) {
      throw new Error('No se puede ejecutar el seed en produccion');
    }
    this.deleteDatabase();

    //todo: construir usuarios

    //todo: construir items

    return true;
  }

  async deleteDatabase() {
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();
    await this.usesrRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }
}
