# Table of contents

* [What is it?](#what-is-it)
* [What does the app stack look like?](#what-does-the-app-stack-look-like)
* [How do you run it locally?](#how-do-you-run-it-locally)
    * [How do you stop it?](#how-do-you-stop-it)
    * [What ports are the containers mapped to?](#what-ports-are-the-containers-mapped-to)
    * [If you change any ports, the following files will need to be updated](#if-you-change-any-ports-the-following-files-will-need-to-be-updated)
* [How do I seed the database?](#how-do-i-seed-the-database)
* [Using the app](#using-the-app)
    * [How do I register?](#how-do-i-register)
    * [How do I login?](#how-do-i-login)
    * [How do I logout?](#how-do-i-logout)
* [Security](#security)
    * [CSRF](#csrf)
    * [XSS](#xss)
    * [Sessions](#sessions)
    * [Token storage](#token-storage)
    * [How are the `Offers` assigned demographics (age and gender)?](#how-are-the-offers-assigned-demographics-age-and-gender)
* [TODOS](#todos)
    * [Improve validation](#improve-validation)
        * [Email validation](#email-validation)
        * [Birthdate validation](#birthdate-validation)
    * [Paginate the Offers page](#paginate-the-offers-page)
    * [Consider an abstraction pattern to query the User Offers](#consider-an-abstraction-pattern-to-query-the-user-offers)
    * [CI/CD](#ci--cd)
        * [Ruby on Rails backend](#ruby-on-rails-backend)
        * [React frontend](#react-frontend)

# What is it?

The objective of this app is to provide targeted offers to users based on the following demographics:

* Age
* Gender

See the full specifications [here](https://github.com/bretten/ruby_example_user_offers/wiki/Spec).

# What does the app stack look like?

* Ruby on Rails 7 API only backend
    * Allows registration. login, logout
    * Stateless, token-based authentication
    * Serves Offers to authenticated Users
    * Authenticates by checking token in `Authorization` header
* PostgreSQL database
    * Registered users are persisted here
    * Stores Offers (pre-seeded from test file)
    * Stores Offer demographics (age range and gender)
* React frontend
    * React single page application + [react router](https://www.npmjs.com/package/react-router-dom)
    * Stores authentication token from login endpoint in session storage
    * Logout clears session storage

![image](https://user-images.githubusercontent.com/5249819/197590898-2524a736-51d4-4cd6-bef4-46a9ac6e4ae8.png)

# How do you run it locally?

Running it requires docker compose.

From the repository root, run:

```
docker-compose build
docker-compose up -d
```

### How do you stop it?

```
docker-compose down --volume
```

### What ports are the containers mapped to?

* `30000` - React frontend
* `30001` - Rails backend
* `54320` - PostgreSQL

### If you change any ports, the following files will need to be updated:

Note: In a real deployment environment, we could replace these using environment variables and string replacement
when the Docker container image is built.

### `docker-compose.yml`

```
- WDS_SOCKET_PORT=30000
```

### `ui/react/app/.env`

```
REACT_APP_OFFERS_BASE_URL=http://localhost:30001
```

### `user_offers/config/initializers/cors.rb`

```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:30000', 'localhost:30001'
```

# How do I seed the database?

Some data is pre-populated in
the [seed file](https://github.com/bretten/ruby_example_user_offers/blob/main/user_offers/db/seeds.rb)

From the repository root, first make sure the docker-compose is up:

```
docker-compose build
docker-compose up -d
```

Then, connect to the container that has the Rails app:

```
docker exec -it ruby_offers bash
```

Then, run the `db:setup` rails command:

```
rails db:setup
```

# Using the app

The front end will be available at: http://localhost:30000.

* If you are **not** authenticated, it will display a link to login or register.
* If you are authenticated, it will display your **offers** and a link to logout.

## How do I register?

You can fill out the form at: http://localhost:30000/register

## How do I login?

The seeded users are below. You login at: http://localhost:30000/login

* User1
    * E-mail: user1@example.com
    * Password: password!
* User2
    * E-mail: user2@example.com
    * Password: password!

## How do I logout?

http://localhost:30000/logout

# Security

## CSRF

The application disables cookies and instead performs authentication by sending a Bearer Token in the `Authorization`
header.
So a malicious person could not attempt to trick the user into performing requests where credentials may be
automatically be added by the browser (cookies, HTTP basic auth).

The Ruby on Rails backend disables cookies in the `user_offers/config/application.rb`:

```
    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.session_store :disabled
```

## XSS

The application displays no data that was inputted from Users. This means that User A cannot read any data input from
User B.
Any offers are generated by admins. And even if some Offer data managed to contain malicious scripts, when it is
displayed
on the UI, the string would be escaped.

NOTE: Additionally, in a real environment, if you were to use any 3rd party libraries like Bootstrap/MUI/antd, the CI/CD
pipeline
could scan installed
versions for vulnerabilities.

## Sessions

Sessions are disabled to prevent any session hijacking.

## Token storage

The app uses stateless, token-based authentication. When the user logs in, they are given a `Bearer Token`. The React
front end will store this in session storage.

Currently, the application does as much as it can to prevent XSS by displaying no user inputted information
and also makes sure to escape any data that is displayed in the browser.

# How are the `Offers` assigned demographics (age and gender)?

There is a join table model
called [OfferDemographic](https://github.com/bretten/ruby_example_user_offers/blob/main/user_offers/app/models/offer_demographic.rb)
.
It has the columns:

* Offer ID
* Minimum age
* Maximum age
* Gender

There is a `hasMany` relationship from `Offer` to `OfferDemographic`. In other words:

* An `Offer` has many `OfferDemographics`
* An `OfferDemographic` belongs to an `Offer`

![image](https://user-images.githubusercontent.com/5249819/197414754-c248fdf6-f456-4bd6-8239-a877eef3fa5d.png)

### How could this have been done differently?

In `OfferDemographic`, aside from the foreign key (`offer_id`), there is no information uniquely tying it to the offer.
For example, consider:

* `Offer_A` has a **minimum age** = 20, **maximum age** = 30, and **gender** = 0
* `Offer_B` is exactly the same and has a **minimum age** = 20, **maximum age** = 30, and **gender** = 0

This would require two separate `OfferDemographic` rows with essentially the same data (just a different `offer_id`).

We could instead normalize the demographic data for all combinations of min age/max age/gender by using
a `has and many belongs to` relationship between `Offer` and `Demographic`.
In other words, the tables would look like:
**Offer**

* id (offer_id)
* Description

**Demographic**

* id (demographic_id)
* minimum_age
* maximum_age
* gender

**OfferDemographic**

* offer_id
* demographic_id

![image](https://user-images.githubusercontent.com/5249819/197414758-579afc02-44b8-4e0b-aa87-6017164e24fb.png)

# TODOs

Things I didn't get around to. These should be done in a real project and I describe how I would implement them.

## Improve validation

https://github.com/bretten/ruby_example_user_offers/issues/22

### Email validation

Create a [custom validator](https://guides.rubyonrails.org/active_record_validations.html#custom-validators) for user
registration that makes sure the email field is an actual email address.

```
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors.add attribute, (options[:message] || "is not an email")
    end
  end
end
```

### Birthdate validation

Create a [custom validator](https://guides.rubyonrails.org/active_record_validations.html#custom-validators) that would
make sure it is a date. I would probably use some date parsing library that could verify it is a valid date string.

## Paginate the Offers page

https://github.com/bretten/ruby_example_user_offers/issues/17

If a user has a lot of personalized offers, it would be better if the endpoint is paginated.

For the Ruby on Rails Offers API, I found a gem called [kaminari](https://github.com/kaminari/kaminari) that has a lot
of stars on Github.

For the React front end, I might use [MUI's pagination](https://mui.com/material-ui/react-pagination/) or I might use an
[infinite scroll component](https://github.com/ankeetmaini/react-infinite-scroll-component) that is popular.

## Consider an abstraction pattern to query the User Offers

https://github.com/bretten/ruby_example_user_offers/issues/15

Currently, I just query the User's Offers directly in the `OffersController`. Coming from a `dotnet` background, it
would
be a more standard practice to abstract this query behind an interface. This allows:

* Better organization as we can move the interface and implementation to a different domain in the repo
* Easily inject a mock implementation of the interface for testing purposes
* Allow multiple implementations to exist and can conditionally choose which to use if running in a serverless
  environment

## CI / CD

What the CI/CD pipelines might look like if this was a real project.

### Ruby on Rails backend

1. Scan dependencies for vulnerabilities
2. Build project
3. Run tests
4. Build container image
5. Upload container image to container repository
6. Switch production tag to new container image

### React frontend

1. Scan dependencies for vulnerabilities
2. Run [cypress](https://github.com/cypress-io/cypress) tests
3. Build container image
4. Upload container image to container repository
5. Switch production tag to new container image