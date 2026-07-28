export type UserId = string;

export type SpecialistId = string;

export interface UpdateMyProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;

  profile?: {
    currentWeight?: number;
    height?: number;
    age?: number;
    gender?: "male" | "female";
    maritalStatus?: "single" | "married" | "divorced" | "widowed";
    location?: string;
    activityLevel?: "low" | "moderate" | "high" | "extreme";
  };
}

export interface SearchProfilesRequest {
  role: string;
  page: number;
  limit: number;
  assignedSpecialistId?: string;
}

export interface CreateSpecialistRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  specialization: string;
  experienceYears?: number;
}

export interface AssignCustomersToSpecialist {
  customerIds: string[];
}

export interface Note {
  content: string;
  customer: string;
  writer: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    id: string;
  };
  attachments: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type SpecialistStatus = "active" | "inactive";

export type SpecialistSpecialization =
  | "diet"
  | "fitness"
  | "nutrition"
  | string;

export type SpecialistInfoDTO = {
  specialization: SpecialistSpecialization;
  experienceYears: number;
  status: SpecialistStatus;
};

export type SpecialistDTO = {
  id: string;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "specialist";
  lastSeen: string;
  specialistInfo: SpecialistInfoDTO;
  assignedCustomersCount: number;
  createdAt: string;
  updatedAt: string;
};

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "customer";
  lastSeen: string;
  avatarUrl: string | null;
  assessment: string;
  createdAt: string;
  updatedAt: string;

  specialist: Specialist;
  profile: Profile;
  weight: WeightSummary;
  lastNote: LastNote;
  subscription: Subscription;
}

export interface Specialist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Profile {
  currentWeight: number;
  weightHistory: WeightHistory[];
  height?: number;
  age?: number;
  gender?: "male" | "female";
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  location?: string;
  activityLevel?: "low" | "moderate" | "high" | "extreme";
}

export interface WeightHistory {
  weight: number;
  date: string;
  note: string | null;
}

export interface WeightSummary {
  current: WeightEntry;
  start: WeightEntry;
}

export interface WeightEntry {
  weight: number;
  date: string;
}

export interface LastNote {
  id: string;
  content: string;
  customer: string;
  writer: NoteWriter;
  attachments?: Attachment[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteWriter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "specialist";
}

export interface Attachment {
  url: string;
}

export interface Subscription {
  name: string;
  displayName: string;
  price: number;
  durationInDays: number;
  active: boolean;
  subscriptionCount: number;
}
