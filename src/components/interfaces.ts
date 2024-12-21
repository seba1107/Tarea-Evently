export interface EventInterface {
  id: number;
  title: string;
  description: string;
  date: Date;
  price: number;
  capacity: number;
  status: boolean;
}

export interface TicketInterface {
	id: number;
	eventId: number;
	buyerName: string;
	buyerLastName: string;
	buyerEmail: string;
	purchaseDate: Date;
	event: {title: string}; // Añadido para mostrar el nombre del evento en la tabla.
}
