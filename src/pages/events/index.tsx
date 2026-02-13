import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getEvents, EventItem } from '@/utils/events';

interface EventsPageProps {
  events: EventItem[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDates(dates: string[]): string {
  if (dates.length === 1) {
    return formatDate(dates[0]);
  }
  return dates.map(formatDate).join(' & ');
}

function isFutureEvent(dates: string[]): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const latestDate = new Date(
    Math.max(...dates.map((d) => new Date(d + 'T00:00:00').getTime()))
  );
  return latestDate >= now;
}

function EventCard({ event }: { event: EventItem }) {
  const [isPlanned, setIsPlanned] = useState(false);

  useEffect(() => {
    setIsPlanned(isFutureEvent(event.dates));
  }, [event.dates]);

  return (
    <article
      id={event.slug}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
    >
      {/* Image */}
      {event.image && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image}
            alt={event.imageAlt || event.title}
            className="w-full h-56 object-cover"
          />
          {isPlanned && (
            <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              Planned
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100">
            {event.title}
          </h2>
          {!event.image && isPlanned && (
            <span className="shrink-0 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              Planned
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDates(event.dates)}
        </p>

        <div
          className="events-content text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: event.descriptionHtml }}
        />

        {event.imageCredit && (
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Image ©️ {event.imageCredit}
          </p>
        )}

        {event.publish_status === 'draft' && (
          <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">
            Draft
          </span>
        )}
      </div>
    </article>
  );
}

export default function EventsPage({ events }: EventsPageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const upcoming = events.filter((e) => isFutureEvent(e.dates));
    const past = events.filter((e) => !isFutureEvent(e.dates));
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [events]);

  return (
    <Layout
      title="Events"
      description="Workshops, hackathons, and talks on AI Driven Development"
      slug="events"
    >
      {/* Intro text */}
      <div className="mb-12 max-w-3xl">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          There is quite some interest from different organisations in AI Driven Development.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Together with{' '}
          <a
            href="https://aishepherd.nl"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            JD
          </a>
          , as{' '}
          <a
            href="https://the-ai-team.dev"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The AI-Team
          </a>
          , we organize and consult for events that aim to embed AI Driven Development.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          No events yet. Check back soon!
        </p>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Upcoming
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-6">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = getEvents();

  return {
    props: {
      events,
    },
  };
};
