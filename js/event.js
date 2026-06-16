// event.js
// Create, edit, delete and search events in Local Storage.

const EventManager = (() => {
  const getEventFields = () => ({
    name: document.getElementById('eventName').value.trim(),
    description: document.getElementById('eventDescription').value.trim(),
    date: document.getElementById('eventDate').value,
    venue: document.getElementById('eventVenue').value.trim(),
    size: document.getElementById('eventSize').value,
    deadline: document.getElementById('eventDeadline').value,
    id: `EVENT-${Date.now().toString().slice(-5)}`,
    seats: Math.max(0, Number(document.getElementById('eventSize')?.value || 0) * 5),
    status: 'Open',
  });

  const clearForm = () => {
    ['eventName', 'eventDescription', 'eventDate', 'eventVenue', 'eventSize', 'eventDeadline'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = '';
    });
  };

  const renderEvents = (events) => {
    const grid = document.getElementById('eventGrid');
    if (!grid) return;
    if (!events.length) {
      grid.innerHTML = '<div class="empty-state glass-card"><p>No events available yet. Create your first event to begin managing registrations.</p></div>';
      return;
    }

    grid.innerHTML = events.map((event) => `
      <article class="event-card glass-card">
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <div class="event-meta">
          <span>${event.date}</span>
          <span>${event.venue}</span>
        </div>
        <div class="event-meta">
          <span>Seats: ${event.seats}</span>
          <span>Status: <strong>${event.status}</strong></span>
        </div>
        <div class="form-actions">
          <button class="btn btn-outline" data-action="edit" data-id="${event.id}">Edit</button>
          <button class="btn btn-secondary" data-action="delete" data-id="${event.id}">Delete</button>
        </div>
      </article>
    `).join('');
  };

  const updateEvents = () => {
    const events = Storage.getEvents();
    renderEvents(events);
  };

  const handleCreate = () => {
    const eventData = getEventFields();
    if (!eventData.name || !eventData.date || !eventData.venue) {
      Toast.show('Event name, date and venue are required.');
      return;
    }
    const events = Storage.getEvents();
    events.push(eventData);
    Storage.saveEvents(events);
    clearForm();
    updateEvents();
    Toast.show('Event created successfully.');
  };

  const handleGridClick = (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    const events = Storage.getEvents();
    if (action === 'delete') {
      const filtered = events.filter((item) => item.id !== id);
      Storage.saveEvents(filtered);
      updateEvents();
      Toast.show('Event removed.');
    } else if (action === 'edit') {
      const current = events.find((item) => item.id === id);
      if (!current) return;
      document.getElementById('eventName').value = current.name;
      document.getElementById('eventDescription').value = current.description;
      document.getElementById('eventDate').value = current.date;
      document.getElementById('eventVenue').value = current.venue;
      document.getElementById('eventSize').value = current.size;
      document.getElementById('eventDeadline').value = current.deadline;
      Toast.show('Event data loaded in the form. Edit and create again to update.');
    }
  };

  const filterEvents = () => {
    const search = document.getElementById('searchEvent')?.value.toLowerCase() || '';
    const filter = document.getElementById('filterEvent')?.value || 'all';
    const events = Storage.getEvents().filter((item) => {
      const matchesSearch = [item.name, item.description, item.venue].some((field) => field.toLowerCase().includes(search));
      const matchesFilter = filter === 'all' || item.status.toLowerCase() === filter;
      return matchesSearch && matchesFilter;
    });
    renderEvents(events);
  };

  const init = () => {
    updateEvents();
    document.getElementById('createEvent')?.addEventListener('click', handleCreate);
    document.getElementById('clearEvent')?.addEventListener('click', (event) => {
      event.preventDefault();
      clearForm();
    });
    document.getElementById('eventGrid')?.addEventListener('click', handleGridClick);
    document.getElementById('searchEvent')?.addEventListener('input', filterEvents);
    document.getElementById('filterEvent')?.addEventListener('change', filterEvents);
  };

  return { init };
})();

window.addEventListener('DOMContentLoaded', () => {
  EventManager.init();
});
