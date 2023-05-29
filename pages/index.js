import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helper/api-util";
import Head from "next/head";
import React from "react";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find the best event around the world.."
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
  };
}
