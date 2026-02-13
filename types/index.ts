export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  city: string;
  bloodGroup?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  categoryId: string;
  experience: number;
  rating: number;
  reviewCount: number;
  fee: number;
  avatar: string;
  hospital: string;
  isOnline: boolean;
  education: string;
  about: string;
  languages: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'online' | 'offline';
  status: 'upcoming' | 'completed' | 'cancelled';
  fee: number;
  paymentStatus: 'paid' | 'pending';
  zoomLink?: string;
}

export interface SymptomResult {
  category: string;
  categoryId: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high';
  description: string;
}
