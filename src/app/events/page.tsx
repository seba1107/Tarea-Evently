"use client";
import { getAllEvents } from "@/actions/event-actions";
import { EventInterface } from "@/components/interfaces";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setFilteredEvents(
      events.filter((event) => event.title.toLowerCase().includes(lowerQuery))
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col space-y-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 mx-auto">Eventos</h1>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <Card>
                <CardHeader className="flex flex-row justify-between">
                  <Skeleton className="w-32 h-6" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-24" />
                </CardContent>
                <CardFooter className="flex gap-x-2 justify-end">
                  <Skeleton className="w-20 h-6" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Eventos</h1>

      <Input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card>
                <CardHeader className="flex flex-row justify-between">
                  <CardTitle>{event.title}</CardTitle>
                  <Badge
                    className={clsx({
                      "bg-green-500 hover:bg-green-500": event.status,
                      "bg-gray-500 hover:bg-gray-500": !event.status,
                    })}
                  >
                    {event.status ? "Activo" : "Borrador"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <span className="text-slate-600">{new Date(event.date).toLocaleDateString()}</span>
                </CardContent>
                <CardFooter className="flex gap-x-2 justify-end">
                  <p>${event.price}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay eventos encontrados.</p>
      )}
    </div>
  );
}
