# What is it?

The objective of this app is to provide targeted offers to users based on the following demographics:

* Age
* Gender

See the full specifications [here](https://github.com/bretten/ruby_example_user_offers/wiki/Spec).

# How do you run it locally?

Running it requires docker compose.

From the repository root, run:

```
docker-compose build
docker-compose up -d
```

### How do you stop it?

```
docker-compose stop
docker-compose rm -f
```

### What ports are the containers mapped to?

* `30000` - React frontend
* `30001` - Rails backend
* `54320` - PostgreSQL

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

![image](https://user-images.githubusercontent.com/5249819/197414506-8b151817-e730-426f-bd8e-14bc914bd122.png)

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
