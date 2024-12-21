"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
	
	const onSubmit = async (data: {
		title: string;
		description: string;
		date: string;
		time: string; // Recibimos la hora aquí.
		price: number;
		capacity: number;
		status: boolean;
	}) => {
		// Combinar fecha y hora en un formato ISO-8601
		const dateTime = new Date(`${data.date}T${data.time}:00`);

		try{
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

	return (
		<div className="flex flex-col justify-center items-center h-screen px-4">
			<div className="text-center space mb-4">
				<h1 className="text-2xl font-bold">Crear Evento</h1>
				<p className="text-gray-500">Llena los campos para crear un evento</p>
			</div>

			<FormProvider {...form}>
				<form className="space-y-4 w-full max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
					{/* Título */}
					<FormField
						control={form.control}
						name="title"
						rules={{
							required: form.getValues("status") ? "El título es obligatorio cuando el estado está activo." : false,
						}}
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
						rules={{
							required: form.getValues("status") ? "La descripción es obligatoria cuando el estado está activo." : false,
						}}
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
						rules={{
							required: form.getValues("status") ? "La fecha es obligatoria cuando el estado está activo." : false,
						}}
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
						rules={{
							required: form.getValues("status") ? "La hora es obligatoria cuando el estado está activo." : false,
						}}
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
						rules={{
							required: form.getValues("status") ? "El precio es obligatorio cuando el estado está activo." : false,
						}}
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
						rules={{
							required: form.getValues("status") ? "El número de cupos es obligatorio cuando el estado está activo." : false,
						}}
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
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<Label>{"Activo"}</Label>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Botón de enviar */}
					<Button type="submit" className="w-full">Crear Evento</Button>
				</form>
			</FormProvider>
		</div>
	);
}
