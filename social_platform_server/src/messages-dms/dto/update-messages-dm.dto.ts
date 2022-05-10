import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesDmDto } from './create-messages-dm.dto';

export class UpdateMessagesDmDto extends PartialType(CreateMessagesDmDto) {}
