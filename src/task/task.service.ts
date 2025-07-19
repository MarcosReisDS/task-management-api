import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    private tasks: TaskDto[] = [];
    async create(task: TaskDto) {
        const taskToSave: TaskEntity = {
            title: task.title,
            description: task.description,
            expirationDate: task.expirationDate,
            status: TaskStatusEnum.TO_DO
        }

        const createdTask = await this.taskRepository.save(taskToSave);

        return this.mapEntityToDto(createdTask)
    }

    async findById(id: string): Promise<TaskDto> {
        const foundTask = await this.taskRepository.findOne({ where: { id } })

        if (!foundTask) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return this.mapEntityToDto(foundTask)
    }

    async findAll(params: FindAllParameters): Promise<TaskDto[]> {
        const searchParams: FindOptionsWhere<TaskEntity> = {}

        if (params.title) {
            searchParams.title = Like(`%${params.title}%`)
        }

        if (params.status) {
            searchParams.status = Like(`%${params.status}%`)
        }

        const tasksFound = await this.taskRepository.find({
            where: searchParams
        })

        return tasksFound.map(taskEntity => this.mapEntityToDto(taskEntity))
    }

    async update(id: string, task: TaskDto) {
        const foundTask = await this.taskRepository.findOne({ where: { id } })

        if (!foundTask) {
            throw new NotFoundException(`Task with id ${task.id} not found`)
        }

        return await this.taskRepository.update(id, this.mapDtoToEntity(task))
    }

    async remove(id: string) {
        const result = await this.taskRepository.delete(id)

        if(!result.affected) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return await result
    }

    private mapEntityToDto(taskEntity: TaskEntity): TaskDto | any {
        return {
            id: taskEntity.id,
            title: taskEntity.title,
            description: taskEntity.description,
            expirationDate: taskEntity.expirationDate,
            status: TaskStatusEnum[taskEntity.status]
        }
    }

    private mapDtoToEntity(taskDto: TaskDto): Partial<TaskEntity> {
        return {
            title: taskDto.title,
            description: taskDto.description,
            expirationDate: taskDto.expirationDate,
            status: taskDto.status.toString()
        }
    }
}
