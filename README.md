# README

## Overview

This project contains a React application (`react-file-viewer`) and a Node.js server (`server`). The provided `Dockerfile` is designed to build the React application, move the production build into the server's `public` folder, and run the server within a Docker container.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)

## Instructions

### 1. Build the Docker Image

Run the following command from the root directory of the project (where the `Dockerfile`, `server/`, and `react-file-viewer/` directories are located):

```bash
docker build -t react-server .
```

This command:

- Uses the `Dockerfile` located in the root directory.
- Builds the Docker image and tags it as `react-server`.

### 2. Run the Docker Container

Run the following command to start the container:

```bash
docker run -p 3000:3000 react-server
```

This command:

- Maps port `3000` on your local machine to port `3000` inside the container (adjust the port if your server uses a different one).
- Starts the server, which serves the React application from the `/public` folder.

### 3. Access the Application

Once the container is running, open a web browser and navigate to:

```
http://localhost:3000
```

This will load the React application served by the Node.js server.

## Additional Notes

- If you need to stop the running container, you can find its container ID with:

  ```bash
  docker ps
  ```

  Then stop the container using:

  ```bash
  docker stop <container-id>
  ```

- If you make changes to the code, you will need to rebuild the image to apply the updates:

  ```bash
  docker build -t react-server .
  ```

Feel free to reach out if you encounter any issues or need further assistance!

## Author

**Sebastián Pulgarín Yepes**  
- **Cellphone**: +573177593050  
- **Email**: sebxxxp@gmail.com  
- **GitHub**: [sebxp](https://github.com/sebxp)  
- **LinkedIn**: [https://www.linkedin.com/in/sebxxx/](https://www.linkedin.com/in/sebxxx/)