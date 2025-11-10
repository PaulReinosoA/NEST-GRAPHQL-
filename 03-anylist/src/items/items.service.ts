import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const Item = this.itemRepository.create(createItemInput); //instancia no impactada en BD
    await this.itemRepository.save(Item);
    return Item;
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id: id });
    if (!item) throw new NotFoundException(`item with id:${id} not found`);
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    await this.findOne(id);
    const updatedItem = await this.itemRepository.preload(updateItemInput);
    // const updatedItem = await this.itemRepository.findOneBy({ id: id });
    // if (!updatedItem)
    //   throw new NotFoundException(`item with id:${id} not found`);
    // this.itemRepository.update(id, updateItemInput);
    // const updatedItemNew = await this.itemRepository.findOneBy({ id: id });
    return this.itemRepository.save(updatedItem!);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }
}
