import React, { useState, useEffect } from 'react';
import { Search, Phone, MapPin, Star, Plus, X, Filter } from 'lucide-react';

const CATEGORIES = [
  'Plumber', 'Electrician', 'Carpenter', 'Mechanic', 'Tailor',
  'Hairdresser', 'Photographer', 'Caterer', 'Cleaner', 'Painter',
  'Security Guard', 'Driver', 'Mason', 'Welder', 'Other'
];

const DISTRICTS = [
  'Kampala', 'Wakiso', 'Mukono', 'Jinja', 'Mbarara', 'Gulu',
  'Lira', 'Mbale', 'Masaka', 'Entebbe', 'Arua', 'Fort Portal', 'Other'
];

export default function ServicesDirectory() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    district: '',
    phone: '',
    whatsapp: '',
    description: '',
    experience: '',
    premium: false
  });

  // Improved data loading and state management
  useEffect(() => {
    (async () => {
      const data = await loadServices();
      setServices(data || []);
    })();
  }, []);

  const loadServices = async () => {
    try {
      const result = await window.storage.list('service:');
      if (result && result.keys) {
        return await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await window.storage.get(key);
              return data ? JSON.parse(data.value) : null;
            } catch {
              return null;
            }
          })
        ).then(data => data.filter(s => s !== null));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
    return [];
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.district || !formData.phone || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const newService = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0
    };

    try {
      await window.storage.set(`service:${newService.id}`, JSON.stringify(newService));
      setServices([newService, ...services]);
      setFormData({
        name: '',
        category: '',
        district: '',
        phone: '',
        whatsapp: '',
        description: '',
        experience: '',
        premium: false
      });
      setShowAddForm(false);
    } catch (error) {
      alert('Error saving service. Please try again.');
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All' || service.district === selectedDistrict;
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  const premiumServices = filteredServices.filter(s => s.premium);
  const regularServices = filteredServices.filter(s => !s.premium);
  const sortedServices = [...premiumServices, ...regularServices];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md px-6 py-4">
        <h1 className="text-3xl font-bold">🇺🇬 Uganda Services Directory</h1>
        <p>Find trusted local service providers across Uganda.</p>
      </header>

      {/* Content */}
      <main className="container mx-auto p-6">
        {/* Search & Filters */}
        {/* Content here */}
      </main>
    </div>
  );
}