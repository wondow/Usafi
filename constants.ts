import { EventCategory } from './types';

export const EVENT_DEFAULT_VALUES = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date().toISOString(),
  endDateTime: new Date().toISOString(),
  price: '',
  isFree: true,
  url: '',
  category: EventCategory.Cleanup,
};

export const CATEGORIES = [
  { id: '1', name: EventCategory.Cleanup },
  { id: '2', name: EventCategory.Recycling },
  { id: '3', name: EventCategory.Seminar },
  { id: '4', name: EventCategory.Inspection },
  { id: '5', name: EventCategory.Community },
];

export const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Nairobi River Cleanup',
    description: 'Join us for a massive cleanup drive along the Nairobi river. Gloves and bags provided.',
    location: 'Nairobi River, KE',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    startDateTime: new Date(Date.now() + 86400000).toISOString(),
    endDateTime: new Date(Date.now() + 90000000).toISOString(),
    price: '0',
    isFree: true,
    url: '',
    category: EventCategory.Cleanup,
    organizer: 'Green Future',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Plastic Recycling Workshop',
    description: 'Learn how to sort and recycle plastics effectively at home.',
    location: 'Community Hall, Westlands',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    startDateTime: new Date(Date.now() + 172800000).toISOString(),
    endDateTime: new Date(Date.now() + 176400000).toISOString(),
    price: '500',
    isFree: false,
    url: '',
    category: EventCategory.Recycling,
    organizer: 'Takasafi Team',
    createdAt: Date.now(),
  }
];