export async function getAllEvents() {
  const serverData = await fetch(
    "https://next-react-summary-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  return await serverData.json();
}

export async function getFeaturedEvents() {
  const DUMMY_EVENTS = await getAllEvents();
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const DUMMY_EVENTS = await getAllEvents();

  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const DUMMY_EVENTS = await getAllEvents();

  return DUMMY_EVENTS.find((event) => event.id === id);
}
