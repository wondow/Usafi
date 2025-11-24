export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDateTime: string;
  endDateTime: string;
  price: string;
  isFree: boolean;
  url?: string;
  category: string;
  organizer: string;
  createdAt: number;
}

export interface ICategory {
  id: string;
  name: string;
}

export enum EventCategory {
  Cleanup = 'Cleanup Drive',
  Recycling = 'Recycling Workshop',
  Seminar = 'Educational Seminar',
  Inspection = 'Waste Inspection',
  Community = 'Community Meeting'
}

export type EventFormData = Omit<IEvent, 'id' | 'createdAt' | 'organizer'>;

export interface User {
  id: string;
  name: string;
  email: string;
}