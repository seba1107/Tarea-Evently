import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./theme-toggle-button";
import Image from "next/image";

export function Navbar () {
	return (
		<nav className="flex justify-between items-center py-4 px-8">
			<Link href="/events">
				<h1 className="text-2xl font-bold">Tarea Evently
				</h1>
			</Link>

			<div className="flex gap-x-2 items-center">
				<Link href="/events" className= {buttonVariants({variant: "secondary"})}> Eventos </Link>
				<Link href="/admin/events" className= {buttonVariants({variant: "secondary"})}> Nuevo Evento </Link>
				<Link href="/admin/tickets" className= {buttonVariants({variant: "secondary"})}> Tickets </Link>
				<ModeToggle />
			</div>
		</nav>
	)
}