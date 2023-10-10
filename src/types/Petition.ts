import { User } from "./User";

export interface Petition {
  id: number;
  initiator: string;
  name: string;
  date: string;
  nrSign: number;
  nrsignneeded: number;
  content: string;
  toWho: string;
  statut: string;
  semnat?: string;
  feedback: string;
  deadLine: string;
  category: string;
  locatie?: string;
}

export interface PetitionFormData {
  name: string;
  content: string;
  category: string;
  locatie?: string;
  toWho: string;
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
