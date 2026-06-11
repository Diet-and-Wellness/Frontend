export interface UserId {
  id: string;
}

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
  experienceYears: number;
}

export interface AssignCustomersToSpecialist {
  customerIds: string[];
}

export type UserDTO = {
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
  specialist: string | null;
  weightBefore?: number;
  weightAfter?: number;

  subscription: {
    id: string;
    user: string;
    status: string;
    startDate: string;
    expiryDate: string;
    subscriptionCount: number;
    currentOrder: string | null;
    isAutoRenewalEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    lastRenewalDate: string;

    subscription: {
      id: string;
      name: string;
      displayName: string;
      price: number;
      durationInDays: number;
      description: string;
    };
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
