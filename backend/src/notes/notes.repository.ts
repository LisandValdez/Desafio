import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; content: string }) {
    return this.prisma.note.create({ data });
  }

  findMany(filter: { archived?: boolean }) {
    return this.prisma.note.findMany({ where: filter, orderBy: { createdAt: 'desc' } });
  }

  findById(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.note.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}