import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import Button from './components/Button';
import { IEvent, EventFormData, EventCategory } from './types';
import { MOCK_EVENTS, CATEGORIES } from './constants';
import { Search, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>(MOCK_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // This simulates the "Evently" feature of creating an event
  const handleCreateEvent = (data: EventFormData) => {
    const newEvent: IEvent = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      organizer: 'Current User', // In a real app, this comes from auth
    };
    setEvents(prev => [newEvent, ...prev]);
    setShowCreateModal(false);
  };

  const handleDeleteEvent = (id: string) => {
      setEvents(prev => prev.filter(e => e.id !== id));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header 
            onOpenCreate={() => setShowCreateModal(true)} 
            onNavigateHome={() => setShowCreateModal(false)}
        />
        
        <main className="flex-1">
          {showCreateModal ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <EventForm 
                    onSubmit={handleCreateEvent} 
                    onCancel={() => setShowCreateModal(false)} 
                />
            </div>
          ) : (
            <>
              {/* Hero Section - "Takasafi" Aesthetic */}
              <section className="bg-primary-50 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                      Host, Connect, <br />
                      <span className="text-primary-600">Celebrate Your Community.</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                      Takasafi is the platform for those who want to make a tangible difference. 
                      Book and learn helpful tips from 3,000+ mentors in world-class waste management communities.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg" onClick={() => window.location.href='#events'}>Explore Events</Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                     <img 
                        src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop" 
                        alt="Community Cleanup" 
                        className="rounded-2xl shadow-xl object-cover h-[400px] w-full"
                     />
                  </div>
                </div>
              </section>

              {/* Search and Filter Section - "Evently" Feature */}
              <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-gray-900">Trust by <br /> Thousands of Events</h2>
                
                <div className="flex flex-col md:flex-row gap-4 w-full">
                   <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text"
                        placeholder="Search title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                      />
                   </div>
                   <div className="relative w-full md:w-64">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
                      >
                         <option value="">All Categories</option>
                         {CATEGORIES.map(cat => (
                             <option key={cat.id} value={cat.name}>{cat.name}</option>
                         ))}
                      </select>
                   </div>
                </div>

                {/* Event List - "Evently" Feature */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                onDelete={handleDeleteEvent}
                                isCreator={event.organizer === 'Current User'}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
                             <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                             <p className="text-gray-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
              </section>
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;