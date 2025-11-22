import { Subject, User, Notification, AttendanceRecord, Student } from './types';

export const APP_NAME = "Attendly";

export const MOCK_USER: User = {
  name: "Alex Rivera",
  email: "alex.rivera@college.edu",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  avatar: "https://picsum.photos/200/200",
};

export const MOCK_TEACHER = {
  name: "Dr. Sarah Smith",
  email: "sarah.smith@college.edu",
  department: "Computer Science",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
};

export const MOCK_STUDENTS_LIST: Student[] = [
  { id: '1', name: 'Alex Rivera', rollNo: 'CS-23-001', avatar: 'https://picsum.photos/200/200' },
  { id: '2', name: 'Maria Garcia', rollNo: 'CS-23-002', avatar: 'https://picsum.photos/200/201' },
  { id: '3', name: 'James Wilson', rollNo: 'CS-23-003', avatar: 'https://picsum.photos/200/202' },
  { id: '4', name: 'Sarah Chen', rollNo: 'CS-23-004', avatar: 'https://picsum.photos/200/203' },
  { id: '5', name: 'Michael Brown', rollNo: 'CS-23-005', avatar: 'https://picsum.photos/200/204' },
  { id: '6', name: 'Emily Davis', rollNo: 'CS-23-006', avatar: 'https://picsum.photos/200/205' },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Data Structures', faculty: 'Dr. Smith', totalClasses: 45, attendedClasses: 38, color: '#4A90A4', batch: 'CS-A', time: '09:30 AM', room: 'Lab 3', studentsCount: 45 },
  { id: '2', name: 'Network Security', faculty: 'Prof. Johnson', totalClasses: 40, attendedClasses: 28, color: '#FFD29D', batch: 'CS-B', time: '11:00 AM', room: 'Room 204', studentsCount: 42 },
  { id: '3', name: 'Linear Algebra', faculty: 'Dr. Williams', totalClasses: 35, attendedClasses: 32, color: '#95E1D3', batch: 'CS-Final', time: '02:00 PM', room: 'Room 101', studentsCount: 30 },
  { id: '4', name: 'Web Development', faculty: 'Prof. Brown', totalClasses: 42, attendedClasses: 40, color: '#FF8FAB', batch: 'CS-A', time: '10:30 AM', room: 'Lab 1', studentsCount: 40 },
  { id: '5', name: 'Ethics in AI', faculty: 'Dr. Davis', totalClasses: 20, attendedClasses: 12, color: '#A0C4FF', batch: 'CS-C', time: '01:00 PM', room: 'Auditorium', studentsCount: 120 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Low Attendance Warning', message: 'Attendance falling in Network Security (70%).', type: 'warning', time: '2 hrs ago' },
  { id: '2', title: 'Streak Achieved!', message: 'Great job! 7-day perfect attendance streak.', type: 'success', time: '1 day ago' },
  { id: '3', title: 'Class Cancelled', message: 'Linear Algebra class for tomorrow is cancelled.', type: 'info', time: '2 days ago' },
  { id: '4', title: 'Assignment Due', message: 'Data Structures project submission deadline extended.', type: 'alert', time: '3 hrs ago', sender: 'Dr. Sarah Smith' },
];

// Generate some dummy calendar data for the current month
const generateMockHistory = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.3) { // Only add records for 70% of days
       // Random subject
       const subject = MOCK_SUBJECTS[Math.floor(Math.random() * MOCK_SUBJECTS.length)];
       const rand = Math.random();
       let status: 'Present' | 'Absent' | 'Late' = 'Present';
       if (rand > 0.8) status = 'Absent';
       else if (rand > 0.7) status = 'Late';

       records.push({
         id: `rec-${i}`,
         subjectId: subject.id,
         date: new Date(now.getFullYear(), now.getMonth(), i).toISOString(),
         status
       });
    }
  }
  return records;
};

export const MOCK_HISTORY = generateMockHistory();