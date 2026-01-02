export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    preferred_language: 'fr' | 'en' | 'de' | 'it';
    is_active: boolean;
    is_verified: boolean;
    roles: string[];
    permissions: string[];
    site_id: string | null;
    avatar_url: string | null;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
