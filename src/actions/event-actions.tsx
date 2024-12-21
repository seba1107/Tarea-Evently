"use server";
import prisma from "@/lib/prisma";

export async function CreateEvent(data: {title:string, description:string, date:string, price:number, capacity:number, status:boolean}) {
    
	try{
		const event = await prisma.event.create({
			data: {
				title: data.title,
				description: data.description,
				date: data.date,
				price: data.price,
				capacity: data.capacity,
				status: data.status,
			}
		});
		return event;
	} catch (error) {
		console.error(error);
	}
}

export async function getAllEvents() {
  return await prisma.event.findMany({
  });
}

export async function getEventById(id: number) {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });

  if (!event) {
    throw new Error(`Evento con id ${id} no encontrado.`);
  }

  return event;
}

