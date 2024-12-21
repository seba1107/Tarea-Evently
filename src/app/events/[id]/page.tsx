"use client";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getEventById } from "@/actions/event-actions";
import { EventInterface } from "@/components/interfaces";
import { useRouter } from "next/navigation"; 
import { BuyTicket, getTicketsQuantityByEventId } from "@/actions/ticket-actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function BuyTicketPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const id = parseInt(params.id, 10);

  const [event, setEvent] = useState<EventInterface | null>(null);
  const [ticketsQuantity, setTicketsQuantity] = useState<number>(0);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingTicketsQuantity, setLoadingTicketsQuantity] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoadingEvent(false);
      }
    };

    const fetchTicketsQuantity = async () => {
      try {
        const data = await getTicketsQuantityByEventId(id);
        setTicketsQuantity(data);
      } catch (error) {
        console.error("Error fetching tickets quantity:", error);
      } finally {
        setLoadingTicketsQuantity(false);
      }
    };

    if (id) {
      fetchEvent();
      fetchTicketsQuantity();
    }
  }, [id]);

  const form = useForm({
    defaultValues: {
      buyerName: "",
      buyerLastName: "",
      buyerEmail: "",
      quantity: 0,
    },
  });

  const { watch } = form;

  const onSubmit = async (data: { buyerName: string; buyerLastName: string; buyerEmail: string; quantity: number }) => {
    try {
      await BuyTicket({
        eventId: id,
        ...data,
        quantity: parseInt(data.quantity.toString(), 10),
      });
      toast({
        title: "Entrada(s) comprada(s)",
        description: "La(s) entrada(s) se ha(n) comprado correctamente.",
      });
      router.push("/events");
    } catch (error) {
      console.error("Error al comprar la entrada", error);
    }
  };

  if (loadingEvent || loadingTicketsQuantity) {
    return (
      <div className="p-8 flex flex-col space-y-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 mx-auto">Comprar Entrada</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-6 w-72 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
          </div>

          <div>
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) return <p>Evento no encontrado.</p>;

  const quantity = watch("quantity");

  return (
    <div className="p-8 flex flex-col space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Comprar Entrada</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          <p>Entradas restantes: {event.capacity - ticketsQuantity}</p>
          <p>Precio: ${event.price}</p>
          <p>Total: ${event.price * (quantity || 0)}</p>
        </div>
        <div>
          <FormProvider {...form}>
            <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>

              {/* Nombre */}
              <FormField
                control={form.control}
                name="buyerName"
                rules={{
                  required: "Por favor, ingrese su nombre.",
                }}
                render={() => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input type="text" {...form.register("buyerName")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Apellido */}
              <FormField
                control={form.control}
                name="buyerLastName"
                rules={{
                  required: "Por favor, ingrese su apellido.",
                }}
                render={() => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input type="text" {...form.register("buyerLastName")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Correo Electrónico */}
              <FormField
                control={form.control}
                name="buyerEmail"
                rules={{
                  required: "Por favor, ingrese su correo electrónico.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Por favor, ingrese un correo electrónico válido.",
                  },
                }}
                render={() => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" {...form.register("buyerEmail")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cantidad */}
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: "Por favor, ingrese la cantidad de entradas.",
                  min: {
                    value: 1,
                    message: "La cantidad mínima es 1.",
                  },
                  max: {
                    value: event.capacity - ticketsQuantity,
                    message: "No hay suficientes entradas disponibles.",
                  },
                }}
                render={() => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...form.register("quantity")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Comprar</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
