"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateEvent } from "@/actions/event-actions";
import { useToast } from "@/hooks/use-toast";

export default function CreateEventPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "12:00",
      price: 0,
      capacity: 0,
      status: false,
    },
  });

  const { title, description, date, time, price, capacity } = form.watch();

  const onSubmit = async (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    price: number;
    capacity: number;
    status: boolean;
  }) => {
    const dateTime = new Date(`${data.date}T${data.time}:00`);

    try {
      await CreateEvent({
        ...data,
        date: dateTime.toISOString(),
        price: parseInt(data.price.toString()),
        capacity: parseInt(data.capacity.toString()),
      });
      toast({
        title: "Evento creado",
        description: "El evento se ha creado correctamente.",
      });
      router.push("/events");
    } catch (error) {
      console.error("Error al crear el evento", error);
    }
  };

  const canActivateStatus = () => {
    return title && description && date && time && price > 0 && capacity > 0;
  };

  const handleStatusChange = (value: boolean) => {
    if (value && !canActivateStatus()) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, rellene todos los campos antes de activar el evento.",
      });
      form.setValue("status", false);
    } else {
      form.setValue("status", value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="text-center space mb-4">
        <h1 className="text-2xl font-bold">Crear Evento</h1>
        <p className="text-gray-500">Llena los campos para crear un evento</p>
      </div>

      <FormProvider {...form}>
        <form
          className="space-y-4 w-full max-w-xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descripción */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hora */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="$0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cupos Disponibles */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cupos Disponibles</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estado */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Label>{"Borrador"}</Label>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => handleStatusChange(value)}
                  />
                </FormControl>
                <Label>{"Activo"}</Label>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botón de enviar */}
          <Button type="submit" className="w-full">
            Crear Evento
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
