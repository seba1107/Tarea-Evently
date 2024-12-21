"use server";
import prisma from "@/lib/prisma";

export async function BuyTicket(data: { eventId:number, buyerName:string, buyerLastName:string, buyerEmail:string, quantity:number}) {
    try{
        const tickets = await prisma.ticket.createMany({
            data: Array.from({ length: data.quantity }, () => ({
                eventId: data.eventId,
                buyerName: data.buyerName,
                buyerLastName: data.buyerLastName,
                buyerEmail: data.buyerEmail,
            })),
        });
        return tickets;
    } catch (error) {
        console.error(error);
    }
}

export async function getTicketsQuantityByEventId(eventId: number) {
    try{
        const tickets = await prisma.ticket.count({
            where: {
                eventId: eventId,
            },
        });
        return tickets || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function getAllTickets() {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                event: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return tickets.map(ticket => ({
            ...ticket,
            eventName: ticket.event.title,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}