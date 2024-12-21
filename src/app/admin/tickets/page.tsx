"use client";
import { getAllTickets } from "@/actions/ticket-actions";
import { TicketInterface } from "@/components/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function TicketsHistoryPage() {
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 mx-auto">Historial de Tickets</h1>
        <Table className="border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableCell>
                <Skeleton className="w-16 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-48 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-6" />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-16 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-48 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Historial de Tickets</h1>
      <Table className="border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Comprador</TableCell>
            <TableCell className="text-right">Correo Electrónico</TableCell>
            <TableCell className="text-right">Fecha de Compra</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.event.title}</TableCell>
              <TableCell>{ticket.buyerName} {ticket.buyerLastName}</TableCell>
              <TableCell className="text-right">{ticket.buyerEmail}</TableCell>
              <TableCell className="text-right">
                {new Date(ticket.purchaseDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
