export interface Subject {
  id: string;
  name: string;
  faculty: string;
  totalClasses: number;
  attendedClasses: number;
  color: string; // Hex for charts
  // Optional fields for teacher view
  batch?: string;
  time?: string;
  room?: string;
  studentsCount?: number;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  date: string; // ISO Date
  status: 'Present' | 'Absent' | 'Late' | 'Cancelled';
}

export interface User {
  name: string;
  email: string;
  course: string;
  year: string;
  avatar: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info' | 'alert';
  time: string;
  sender?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  avatar: string;
  status?: 'Present' | 'Absent' | 'Late';
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  Cancelled = 'Cancelled'
}