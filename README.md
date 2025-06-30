# E-Commerce Web Application

This is a full-stack e-commerce web application developed using Python and TypeScript. The backend is built with Django and Django REST Framework, while PostgreSQL serves as the database. The frontend is implemented with React.

The application features a content-based recommendation system that leverages machine learning to suggest similar products to users when they view a product.

The entire application is Dockerized to simplify deployment and execution.

## Starting the app

After cloning the repository, cd to the root directory where the docker-compose.yml file is, open docker desktop, then run:
```bash
docker-compose up --build
```

The build can take some time depending on your internet connection.


Access the frontend through [localhost:3000](http://localhost:3000)

Access the backend thorugh [localhost:8000](http://localhost:8000)

Access the admin panel through [localhost:8000/admin](http://localhost:8000/admin)

You can login with these credentials in the admin panel and add users later.

Email: admin@gmail.com

Password: admin

Access the API Documentation through [localhost:8000/api/docs](http://localhost:8000/api/docs)