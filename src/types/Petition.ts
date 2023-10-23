import { User } from "./User";

export interface IPetition {
  petition_id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  status: Status;
  user_id: number
  created_at: string;
  vote_goal: number;
  current_votes: number;
  semnat?: string;
  exp_date: string;
}
interface Status{
  id: number;
  status: string;
}

export interface PetitionFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  vote_goal: number,
  checkedData: boolean;
  consentedData: boolean;
  exp_date: string;
}

export enum PetitionStatus {
  ALL = "Toate",
  PENDING = "În colectare",
  REVIEW = "În considerare",
  APPROVED = "Aprobat",
  IN_PROGRESS = "În implementare",
  REJECTED = "Refuzat",
}
