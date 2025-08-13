import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [NotesModule],
  providers: [PrismaService]
})
export class AppModule {}