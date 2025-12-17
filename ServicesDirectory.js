// Updated ServicesDirectory.js - Replacing window.storage with localStorage and enhancing error handling

class ServicesDirectory {
    constructor() {
        this.storageKey = 'servicesDirectory';
    }

    // Helper to parse data from localStorage
    readFromLocalStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return [];
        }
    }

    // Helper to write data into localStorage
    writeToLocalStorage(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to write to localStorage:', error);
        }
    }

    // Create a new service
    createService(service) {
        const services = this.readFromLocalStorage();
        services.push(service);
        this.writeToLocalStorage(services);
    }

    // Read all services
    getAllServices() {
        return this.readFromLocalStorage();
    }

    // Update a service by id
    updateService(serviceId, updatedService) {
        const services = this.readFromLocalStorage();
        const serviceIndex = services.findIndex(service => service.id === serviceId);
        if (serviceIndex !== -1) {
            services[serviceIndex] = { ...services[serviceIndex], ...updatedService };
            this.writeToLocalStorage(services);
        } else {
            console.warn(`Service with ID ${serviceId} not found.`);
        }
    }

    // Delete a service by id
    deleteService(serviceId) {
        const services = this.readFromLocalStorage();
        const updatedServices = services.filter(service => service.id !== serviceId);
        if (services.length !== updatedServices.length) {
            this.writeToLocalStorage(updatedServices);
        } else {
            console.warn(`No service with ID ${serviceId} was found to delete.`);
        }
    }
}

// Export the class for use in other parts of the application
export default ServicesDirectory;