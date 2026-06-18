export type UserId = string;

export type SpecialistId = string;

export interface UpdateMyProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SearchProfilesRequest {
  role: string;
  page: number;
  limit: number;
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

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string | null;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  specialist?: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };

  profile: {
    currentWeight: number;
    weightHistory: number[];
    age: number;
    gender: string;
    height: number;
    location: string;
    maritalStatus: string;
  };

  subscription: {
    name: string;
    displayName: string;
    price: number;
    durationInDays: number;
    active: boolean;
    subscriptionCount: number;
  };
};

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
