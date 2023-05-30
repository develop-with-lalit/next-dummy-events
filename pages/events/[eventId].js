import { Fragment } from "react";

import EventSummary from "@/components/event-content/event-summary";
import EventLogistics from "@/components/event-content/event-logistics";
import EventContent from "@/components/event-content/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { getAllEvents, getEventById } from "@/helper/api-util";
import Comments from "@/components/input/comments";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId);
  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths(context) {
  const allEvents = await getAllEvents();

  return {
    paths: allEvents.map((event) => {
      return {
        params: { eventId: event.id },
      };
    }),
    fallback: "blocking",
  };
}
