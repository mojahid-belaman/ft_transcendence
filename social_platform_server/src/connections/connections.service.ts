import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { Connection } from './entities/connection.entity';

@Injectable()
export class ConnectionsService {

  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>    
  ) {}

  create(createConnectionDto) {
    return this.connectionsRepository.findOne({
      where: [createConnectionDto]
    })
    .then(data => {
      if (data)
        throw new ForbiddenException("Already Connected");
      return this.connectionsRepository.save(createConnectionDto)
    })
  }

  findAll(condition) {
    return this.connectionsRepository.find({
      where: [condition]
    });
  }

  findOne(condition) {
    return this.connectionsRepository.findOne({
      where: [condition],
      relations: ['channels']
    });
  }

  /* delete(condition) {
    return this.connectionsRepository.findOne({
      where: [condition]
    })
    .then(res => {
      if (!res)
        throw new NotFoundException("Connection Not Found");
      return this.connectionsRepository.delete({id: condition.id})
    });
  } */
  delete(condition) {
    return this.connectionsRepository.delete(condition)
  }
}
