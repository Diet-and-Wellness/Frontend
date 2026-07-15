import apiClient from "../index";
import type {
  AssignCustomersToSpecialist,
  CreateSpecialistRequest,
  SearchProfilesRequest,
  SpecialistId,
  UpdateMyProfileRequest,
  UserId,
} from "../types/profile.types";

export const profileApi = {
  getMyProfile: () => {
    return apiClient.get("/profile");
  },
  getProfile: (id: UserId) => {
    return apiClient.get(`/profile/${id}`);
  },
  updateMyProfile: (data: UpdateMyProfileRequest) => {
    return apiClient.put("/profile", data);
  },
  searchProfiles: (params: SearchProfilesRequest) => {
    return apiClient.get("/profile/search", {
      params,
    });
  },
  deleteProfile: (id: UserId) => {
    return apiClient.delete(`/profile/${id}`);
  },
  createSpecialist: (data: CreateSpecialistRequest) => {
    return apiClient.post("/profile/specialists", data);
  },
  activateSpecialist: (specialistId: SpecialistId) => {
    return apiClient.patch(`/profile/specialists/${specialistId}/activate`);
  },
  deactivateSpecialist: (specialistId: SpecialistId) => {
    return apiClient.patch(`/profile/specialists/${specialistId}/deactivate`);
  },
  assignCustomersToSpecialist: (
    specialistId: SpecialistId,
    data: AssignCustomersToSpecialist,
  ) => {
    return apiClient.patch(
      `/profile/specialists/${specialistId}/assign-customers`,
      data,
    );
  },
  getAdminDashboard: () => {
    return apiClient.get("/profile/admin/dashboard");
  },
  updateWeight: (customerId: string, weight: number) => {
    return apiClient.patch(`/profile/${customerId}/weight`, { weight });
  },
};
