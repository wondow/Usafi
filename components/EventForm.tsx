import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Image as ImageIcon, Link, Type, Loader2, Sparkles } from 'lucide-react';
import { EventFormData, EventCategory } from '../types';
import { CATEGORIES, EVENT_DEFAULT_VALUES } from '../constants';
import Button from './Button';
import Input from './Input';
import { generateEventDescription } from '../services/geminiService';

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  initialData?: EventFormData;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<EventFormData>(initialData || EVENT_DEFAULT_VALUES);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFree: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.location) {
        alert("Please enter a title and location first.");
        return;
    }
    setIsGenerating(true);
    try {
        const desc = await generateEventDescription(formData.title, formData.category, formData.location);
        setFormData(prev => ({ ...prev, description: desc }));
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto w-full my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Input 
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Nairobi Community Cleanup"
            required
            icon={<Type className="w-5 h-5 text-gray-400" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 bg-gray-50 border p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
             </div>
             
             <Input 
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location or Online"
                required
                icon={<MapPin className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button 
                    type="button" 
                    onClick={handleGenerateDescription}
                    className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
                    disabled={isGenerating}
                >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    Generate with AI
                </button>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-gray-300 bg-gray-50 border p-3 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Describe your event..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
                label="Start Date"
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime ? new Date(formData.startDateTime).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                required
                icon={<Calendar className="w-5 h-5 text-gray-400" />}
            />
            <Input 
                label="End Date"
                type="datetime-local"
                name="endDateTime"
                value={formData.endDateTime ? new Date(formData.endDateTime).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                required
                icon={<Calendar className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <Input 
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            icon={<ImageIcon className="w-5 h-5 text-gray-400" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
             <div className="flex items-center h-full pt-6">
                <input
                    id="isFree"
                    name="isFree"
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isFree" className="ml-2 block text-sm text-gray-900">
                    Free Ticket
                </label>
             </div>
             
             {!formData.isFree && (
                <Input 
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="50"
                    icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                />
             )}
          </div>
          
           <Input 
            label="Event URL (Optional)"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://zoom.us/..."
            icon={<Link className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
             <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
             <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;