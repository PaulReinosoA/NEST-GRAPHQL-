import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { ItemsModule } from 'src/items/items.module';
import { ListItemModule } from 'src/list-item/list-item.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, UserModule, ItemsModule, ListsModule, ListItemModule],
})
export class SeedModule {}
