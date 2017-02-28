# Alien Doctor


![Alien Doctor](assets/snap.png)

## Technologies Used
- HTML
- CSS
- Vanilla JavaScript
- jQuery

## Code Example

```javascript

//array of side effect functions

const counterAttacks = [chance1, chance2, chance3, chance4, chance5];

//function that chooses a random function from the array every time it is triggered ( after each user turn)

const counterChance = function counterFunction() {
  setTimeout(function() {
  counterAttacks[Math.floor(Math.random()*5)]();
}, 4000);
}

```

## Build Strategy

I created a class alien, which should make it easier to expand the game into multiple levels/locations, and then used DOM manipulation to recreate the simple turn-based RPG methodology from early Pokemon games. After every "treatment" function a user tries a "side-effect" function is triggered. The health level is changed with each type of function, and it's linked to a smooth-sliding health bar and CSS animations that illustrate the alien's response. 

## Contributing 

My own damn self (you know who you are). Actually that's just from an Eazy-E record. Vince helped me a lot!

## Complications/Future Improvements

I'd like to migrate the "treatments" and "side-effects" to class objects and create more aliens and levels. 

## Author

Dain Chatel 
# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
