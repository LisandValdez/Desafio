import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private repo: NotesRepository) {}

  create(dto: CreateNoteDto) {
    return this.repo.create(dto);
  }

  list(archived = false) {
    return this.repo.findMany({ archived });
  }

  async get(id: number) {
    const n = await this.repo.findById(id);
    if (!n) throw new NotFoundException('Note not found');
    return n;
  }

  update(id: number, dto: UpdateNoteDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  archive(id: number) {
    return this.repo.update(id, { archived: true });
  }

  unarchive(id: number) {
    return this.repo.update(id, { archived: false });
  }
}