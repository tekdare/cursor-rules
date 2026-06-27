export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
}
