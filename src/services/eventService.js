const API_URL = 'http://localhost:3001';

export const eventService = {
  // Get all events
  async getAllEvents() {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
  },

  // Get single event
  async getEvent(id) {
    const response = await fetch(`${API_URL}/events/${id}`);
    return response.json();
  },

  // Create new event
  async createEvent(event) {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    return response.json();
  },

  // Update event
  async updateEvent(id, event) {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    return response.json();
  },

  // Delete event
  async deleteEvent(id) {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};