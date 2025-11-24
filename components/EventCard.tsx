import React from 'react';
import { MapPin, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { IEvent } from '../types';
import Button from './Button';

interface EventCardProps {
  event: IEvent;
  onDelete?: (id: string) => void;
  isCreator?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, isCreator }) => {
  const startDate = new Date(event.startDateTime);
  
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <div 
            className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500 h-48 w-full" 
            style={{ backgroundImage: `url(${event.imageUrl || 'https://picsum.photos/400/200'})` }}
        />
      
      {isCreator && onDelete && (
        <div className="absolute right-2 top-2 z-10 rounded-xl bg-white p-3 shadow-sm transition-all">
            <button onClick={() => onDelete(event.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="rounded-full bg-green-100 px-4 py-1 text-green-700 text-xs font-semibold">
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-1 text-gray-500 text-xs font-semibold line-clamp-1">
            {event.category}
          </span>
        </div>

        <p className="text-gray-500 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {startDate.toLocaleDateString()} • {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>

        <h3 className="font-bold text-xl line-clamp-2 flex-1 text-gray-900">{event.title}</h3>

        <div className="flex items-center justify-between w-full">
            <p className="text-gray-600 text-sm flex items-center gap-1 line-clamp-1">
                <MapPin className="w-4 h-4 text-primary-500" />
                {event.location}
            </p>
        </div>

         <div className="flex items-center justify-between w-full mt-2">
             <p className="text-sm text-gray-500 truncate w-1/2">
                 by <span className="text-primary-600 font-medium">{event.organizer}</span>
             </p>
             <a href={event.url || '#'} className="text-primary-600 flex items-center gap-1 text-sm font-medium hover:underline">
                 Details <ArrowRight className="w-4 h-4" />
             </a>
         </div>
      </div>
    </div>
  );
};

export default EventCard;