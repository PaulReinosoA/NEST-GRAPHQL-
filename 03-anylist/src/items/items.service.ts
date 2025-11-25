import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const Item = this.itemRepository.create({ ...createItemInput, user }); //instancia no impactada en BD
    await this.itemRepository.save(Item);
    return Item;
  }

  findAll(user: User): Promise<Item[]> {
    return this.itemRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string, user: User): Promise<Item> {
    const item = await this.itemRepository.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!item) throw new NotFoundException(`item with id:${id} not found`);
    return item;
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User,
  ): Promise<Item> {
    await this.findOne(id, user);
    const updatedItem = await this.itemRepository.preload(updateItemInput);
    // const updatedItem = await this.itemRepository.findOneBy({ id: id });
    // if (!updatedItem)
    //    throw new NotFoundException(`item with id:${id} not found`);
    // this.itemRepository.update(id, updateItemInput);
    // const updatedItemNew = await this.itemRepository.findOneBy({ id: id });
    return this.itemRepository.save(updatedItem!);
  }

  async remove(id: string, user: User): Promise<Item> {
    const item = await this.findOne(id, user);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }

  async itemCountByUser(user: User): Promise<number> {
    return this.itemRepository.count({
      where: { user: { id: user.id } },
    });
  }
}
