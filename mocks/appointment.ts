import { Appointment, TimeSlot } from '@/types';
import { doctors } from './doctors';

export const appointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctor: doctors[0],
    date: '2026-02-15',
    time: '10:00 AM',
    type: 'online',
    status: 'upcoming',
    fee: 500,
    paymentStatus: 'paid',
    zoomLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    doctorId: '5',
    doctor: doctors[4],
    date: '2026-02-18',
    time: '2:30 PM',
    type: 'offline',
    status: 'upcoming',
    fee: 700,
    paymentStatus: 'paid',
  },
  {
    id: '3',
    doctorId: '2',
    doctor: doctors[1],
    date: '2026-02-10',
    time: '11:00 AM',
    type: 'online',
    status: 'completed',
    fee: 1200,
    paymentStatus: 'paid',
    zoomLink: 'https://zoom.us/j/987654321',
  },
  {
    id: '4',
    doctorId: '3',
    doctor: doctors[2],
    date: '2026-02-08',
    time: '4:00 PM',
    type: 'offline',
    status: 'completed',
    fee: 800,
    paymentStatus: 'paid',
  },
  {
    id: '5',
    doctorId: '4',
    doctor: doctors[3],
    date: '2026-02-05',
    time: '9:30 AM',
    type: 'online',
    status: 'cancelled',
    fee: 600,
    paymentStatus: 'pending',
  },
];

export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  ];

  times.forEach((time, index) => {
    slots.push({
      id: `${date}-${index}`,
      time,
      available: Math.random() > 0.3,
    });
  });

  return slots;
};

export const getUpcomingDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};
