<h1 align="center">Fazer Työturvallisuuspeli - Backend</h1>

Backend for LAMK's Fazer Työturvallisuuspeli. Frontend (https://github.com/Fazer-Turvallisuuspeli/fazer-frontend/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Technologies

Node.js,
Express.js,
MongoDB (Mongoose)

### Prerequisites

Node and NPM package manager

### Useful tools for development

Postman,
MongoDB Compass,
OpenVPN

### Installing

Install the required dependecies to get started

```
npm ci
```

# File structure

```
.
├── src                   # Source files
|   ├── models            # Mongoose models
|   ├── routes            # Routes for API requests
|   └── utils             # Utility files
|   index.js              # Starting point
├── .env                  # Environmental variables (for further information see Fazer's Teams-page)
├── .env.placeholder 
├── .eslintignore         # ESLint ignored files
├── .eslintrc.js          # ESLint config file
├── .gitignore
├── .prettierignore       # Prettier ignored files
├── .prettierrc           # Prettier config
├── fazer-api.yaml        # API-documentation, preview in Swagger
├── LICENSE
├── package-lock.json
├── package.json
├── README.md

file
```

## Available Scripts

In the project directory, you can run:

### `npm run watch`

Runs the app in the development mode and connects to Mongo database 'fazer-game-test' in Fazer2 server. (Use openvpn if connecting outside LAMK's network.) <br>
For testing API-requests go to [http://localhost:8080/api/v1/game] (http://localhost:8080/api/v1/game) in Postman.

### `npm run start`

Runs the app in the production mode and connects to Mongo database fazer-game in Fazer2 server. (Use openvpn if connecting outside LAMK's network.) <br>
For testing API-requests go to [http://localhost:3001/api/v1/game] (http://localhost:3001/api/v1/game) in Postman.

### `npm run lint`

Runs ESLint linting tool on project files to **check** for potential issues.

### `npm run lint:fix`

See above command. Fixes all fixable linting issues.

### `npm run format`

Runs Prettier code formatting tool to **check** for potential issues.

### `npm run format:fix`

See above command. Fixes all fixable formatting issues.

## Authors

- **Katri Henttonen** - [Katri Henttonen](https://github.com/KatriH)
- **Jonna Jääskeläinen** - [Jonna Jääskeläinen](https://github.com/JonnaJonna)
- **Veikko Lehmuskorpi** - [Veikko Lehmuskorpi](https://github.com/VeikkoLehmuskorpi)
- **Katri Putkonen** - [Katri Putkonen](https://github.com/Katorip)
- **Jenny Rantanen** - [Jenny Rantanen](https://github.com/jennyran)
- **Jani Selin** - [Jani Selin](https://github.com/selinjani)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details