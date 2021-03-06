import { SubTaskDto } from './SubTaskDto';

export interface TaskDto {
  taskId?: string;
  proId?: string;
  taskCreateTime?: string;
  taskStartTime?: string;
  taskEndTime?: string;
  taskContent?: number;
  userId?: string;
  userName?: string;
  taskStatus?: string;
  taskMark?: string;
  taskLink?: string;
  subTaskDtos?: SubTaskDto[];
}
