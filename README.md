# Audit Management Front End

This repository contains the frontend of the Audit Management application for my Assignment for the module "Project Java and Web Development (DLBCSPJWD01)" at the IU.

This application is supposed to be used in integration with the Back-end application.

Link to the repository of the back end: [https://github.com/GeorgeSoares/Audit_Management_BE](https://github.com/GeorgeSoares/Audit_Management_BE)

## How to Run the Frontend Application with Docker

To get the frontend application running locally using Docker, follow these steps:

1.  **Clone the Repository:**
    First, clone this repository to your local machine:

    ```bash
    git clone [https://github.com/georgesoares/Audit_Management_BE.git]
    ```

2.  **Navigate to the Frontend Directory:**
    The Dockerfile for the frontend application is located directly under `audit_management_fe/` directory. Navigate into this directory:

    ```bash
    cd audit_management_fe
    ```


3.  **Build the Docker Image for the Frontend Application:**
    This command will build the Docker image named `audit-mgmt-fe` using the `Dockerfile` in the current directory. This step compiles the Vue application within the Docker image.

    ```bash
    docker build -t audit-mgmt-fe .
    ```

4.  **Run the Docker Container:**
    Once the image is successfully built, you can run a container from it. This command will start the frontend application in detached mode.

    ```bash
    docker run -d -p 8081:80 --name audit-frontend audit-mgmt-fe
    ```

5.  **Access the Application:**
    After the container starts, you can access the Audit Management frontend application in your web browser at:

    [http://localhost:8081](http://localhost:8081)

---