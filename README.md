# Highscore Server

This is a simple highscore server built with Node.js, Express, and Sequelize. It allows you to manage high scores for different games.

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/NeilVicente/scorekeeper.git
    cd highscore-server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    NODE_ENV=development
    DATABASE_FILE=database.sqlite
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Endpoints

### Get all games

- **URL:** `/games`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "id": 1,
        "name": "Snakey"
      },
      {
        "id": 2,
        "name": "Tetris"
      }
    ]
    ```

### Get high scores for a specific game

- **URL:** `/games/:gameId/highscores`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "id": 1,
        "gameId": 1,
        "player_name": "Alice",
        "score": 100
      },
      {
        "id": 2,
        "gameId": 1,
        "player_name": "Bob",
        "score": 200
      }
    ]
    ```

### Add a new high score for a specific game

- **URL:** `/games/:gameId/highscores`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "player_name": "Charlie",
      "score": 300
    }
    ```
- **Response:**
    ```json
    {
      "id": 3,
      "gameId": 1,
      "player_name": "Charlie",
      "score": 300
    }
    ```

## Models

### Game

- **Fields:**
    - `id`: Integer, Primary Key, Auto Increment
    - `name`: String, Unique, Not Null

### HighScore

- **Fields:**
    - `id`: Integer, Primary Key, Auto Increment
    - `gameId`: Integer, Foreign Key (references `Game.id`), Not Null
    - `player_name`: String, Not Null
    - `score`: Integer, Not Null

## License

This project is licensed under the MIT License.