export interface UserProfile {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  RoleType: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
