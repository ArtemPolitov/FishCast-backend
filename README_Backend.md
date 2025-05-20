# FishCast Backend — REST API for the Fishing Application

This server provides the API for the client-side of [FishCast](https://fish-cast-frontend.vercel.app). It handles users, locations, cities, regions, and fish species. MongoDB is connected, with token and cookie-based authorization implemented.

## Technologies

- **Node.js / Express**  
- **MongoDB / Mongoose**  
- **JWT Authorization**  
- **dotenv / CORS / middleware**  
- **REST API**

## Main routes

- `/api/users` — authorization, registration  
- `/api/locations` — fishing spots  
- `/api/cities`, `/api/regions` — geographic data  
- `/api/fishes` — fish species

## Frontend

[GitHub FishCast-frontend](https://github.com/ArtemPolitov/FishCast-frontend)

## Documentation

https://github.com/ArtemPolitov/FishCast-frontend/blob/styles/adaptive/FishCast_%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F_%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82%D1%83.pdf