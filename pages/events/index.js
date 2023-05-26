import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const AllEventsPage = () => {
  const events = getAllEvents();

  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`events/${year}/${month}`);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
