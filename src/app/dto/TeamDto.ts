import { ProjectDto } from './projectDto';

export interface TeamDto {
  teamId?: string;
  teamName?: string;
  adminId?: string;
  leaderId?: string;
  leaderName?: string;
  teamDescribe?: string;
  teamType?: string;
  teamScope?: string;
  teamNumber?: string;
  sumNumber?: string;
  teamDate?: string;
  status?: string;
  staff?: string;
  teamNature?: string;
  teamLabel?: string;
  seeNum?: string;
  projects?: ProjectDto[];
}
