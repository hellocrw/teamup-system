import { ProjectDto } from './projectDto';

export interface TeamDto {
  teamId?: string;
  teamName?: string;
  leaderId?: string;
  teamDescribe?: string;
  teamType?: string;
  teamScope?: string;
  teamNumber?: number;
  teamDate?: string;
  status?: string;
  staff?: string;
  teamNature?: string;
  teamLabel?: string;
  seeNum?: string;
  projects?: ProjectDto[];
}
