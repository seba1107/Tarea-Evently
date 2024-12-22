# Tarea Evently

## Instrucciones de Ejecución

1. Instalar dependencias
    Ejecutar el comando:
    ```bash
    npm install

2. Configurar la URL de la base de datos  
    Editar el archivo .env para establecer la URL de la base de datos. (Por defecto, está configurado un RDS de AWS).
    - Si se utiliza un nuevo servidor PostgreSQL, ejecutar el siguiente comando después de la configuración:
    ```bash
    npx prisma migrate dev

3. Iniciar la aplicación
    Ejecutar el comando:
    ```bash
    npm run dev

4. Abrir la aplicación
   Acceder a la URL en el navegador:
   http://localhost:3000/events

Para deploy de Vercel acceder a:
https://tarea-evently.vercel.app/events

---

Contacto: ernesto.barria@usm.cl

Desarrollado por: Ernesto Barría Andrade