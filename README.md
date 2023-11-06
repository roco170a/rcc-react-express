# rcc-react-express

### Construido con

Los componenetes utilizados para esta ejercicio fueron React, PWA, Node, Express y MySQL


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Iniciar

Para poder ejecutar la solución, por favor siga las siguientes instrucciónes:

### PreRequisitos

Instalar Node y npm en su version 18 o posterior
* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalación

Para poder instalar cada unos de los componentes

1. Clone el repositorio
   ```sh
   git clone https://github.com/roco170a/rcc-react-express.git
   ```

2. Instalación del BACKEND (/) 
   ```sh
   npm install
   ```
3. Actualizar la conexion a la base de datos en los archivos .env.*.local
   ```js
	# DATABASE
	DB_USER = usr
	DB_PASSWORD = pass
	DB_HOST = 3.12.120.128
	DB_PORT = 3306
	DB_DATABASE = db_blog   
   ```
4. Ejecutar el backend (/) 
   ```sh
   npm run dev
   ```
5. Instalación del FRONTEND (/blog-client-3) 
   ```sh
   npm install
   ```
3. Actualizar la conexion al backend blogs.api.js
   ```js
	const pathLocal='http://localhost:4000/blog-api/entrada';
   ```
4. Ejecutar el frontend (/) 
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

