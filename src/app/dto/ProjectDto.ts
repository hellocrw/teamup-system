import { TaskDto } from './TaskDto';

export interface ProjectDto {
  proId?: string;
  proName?: string;
  leaderName?: string;
  proDescribe?: string;
  proDate?: string;
  proStartTime?: string;
  proEndTime?: string;
  proStatus?: string;
  teamId?: string;
  proType?: string;
  proCurrentNum?: string;
  proLimiedNum?: string;
  seeNum?: string;
  staff?: string;
  staffList?: string;
  taskDto?: TaskDto;
}
