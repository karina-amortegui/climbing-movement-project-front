# Fullstack end-to-end architecture

User opens
/movements/123

        ↓

React Router sees
/movements/:id

        ↓

renders
<MovementDetail />

        ↓

MovementDetail obtains
id = "123"

        ↓

fetch(".../movements/123")

        ↓

Express matches
GET /movements/:id

        ↓

controller

        ↓

Movement.findById("123")

        ↓

MongoDB

        ↓

JSON response

        ↓

React renders the movement

# Route → decides which component   corresponds to a URL.
# Link → navigates to another URL.
# useParams → reads dynamic information such as :id from the URL.