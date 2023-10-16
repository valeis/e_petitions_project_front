import { User } from "./User";

export interface Petition {
  id: number;
  initiator: string;
  name: string;
  date: string;
  nrSign: number;
  nrsignneeded: number;
  content: string;
  statut: string;
  semnat?: string;
  feedback: string;
  deadLine: string;
  category: string;
}

export interface PetitionFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  vote_goal: number,
  checkedData: boolean;
  consentedData: boolean;
}

export enum PetitionStatus {
  ALL = "Toate",
  PENDING = "În colectare",
  REVIEW = "În considerare",
  APPROVED = "Aprobat",
  IN_PROGRESS = "În implementare",
  REJECTED = "Refuzat",
}
