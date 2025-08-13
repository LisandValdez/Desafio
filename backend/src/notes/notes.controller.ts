import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  list(@Query('archived') archived?: string) {
    const arch = archived === 'true';
    return this.notesService.list(archived === undefined ? false : arch);
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.notesService.get(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.remove(Number(id));
  }

  @Post(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archive(Number(id));
  }

  @Post(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchive(Number(id));
  }
}