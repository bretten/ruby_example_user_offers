# What is it?

This is the front end client for the Ruby on Rails User Offers app.
This front end client was written in React.

# How to run it

Refer to the [README](https://github.com/bretten/ruby_example_user_offers/blob/main/README.md).
You can run the whole app stack using Docker Compose.

Docker compose will start the React client by running:

### `npm start`

# Configuration
The `.env` contains environment variable for the base url for the Ruby on Rails app:
`ui/react/app/.env`

```
REACT_APP_OFFERS_BASE_URL=http://localhost:30001
```