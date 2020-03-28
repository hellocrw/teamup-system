import { SubTaskDto } from './SubTaskDto';

export interface TaskDto {
  taskId?: string;
  teamId?: string;
  proId?: string;
  taskCreateTime?: string;
  taskStartTime?: string;
  taskEndTime?: string;
  taskContent?: number;
  userId?: string;
  taskStatus?: string;
  taskMark?: string;
  subTaskDto?: SubTaskDto;
}
