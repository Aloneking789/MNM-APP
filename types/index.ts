export type UserRole = 'Entrepreneur' | 'Investor' | 'Student' | 'Professional' | 'Freelancer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  photo: string;
  verified: boolean;
  bio: string;
  lookingFor: string[];
  skills: string[];
  matchPercentage?: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  liked?: boolean;
}

export interface Match extends User {
  matchPercentage: number;
  additionalSkills: number;
}
