/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
      fetch(`${DBHelper.DATABASE_URL}/restaurants`)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          return DBHelper.fetchFromCache();
        }  
      })
      .then(result => {
        const restaurants = result;
        for(let i = 0; i < restaurants.length; i++) {
           DBHelper.addToCache(restaurants[i]);
        }
        callback(null, restaurants);
      });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        if(DBHelper.fetchFromCache != undefined || null) {
          restaurants = DBHelper.fetchFromCache();
          const restaurant =  restaurants.find(r => r.id == id);
          callback(null, restaurant);
        } else {
          callback(error, null);
        }
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    if(!restaurant.photograph) {
      return (`/img/restaurants/default-restaurant.jpg`);
    }
    return (`/img/restaurants/${restaurant.photograph}.jpg`);
  }

  // /**
  //  * Map marker for a restaurant.
  //  */
  // static mapMarkerForRestaurant(restaurant, map) {
  //   const marker = new google.maps.Marker({
  //     position: restaurant.latlng,
  //     title: restaurant.name,
  //     url: DBHelper.urlForRestaurant(restaurant),
  //     map: map,
  //     animation: google.maps.Animation.DROP}
  //   );
  //   return marker;
  // }

  // /**
  //  * Remove map's elements from tab order
  //  */
  // static removeMapsTabOrder() {
  //   document.querySelectorAll('#map div, #map iframe, #map area, #map a, #map button').forEach((item) => {
  //     item.setAttribute('tabindex', '-1');
  //   });
  // }

  static addToCache(restaurant) {
    idb.open('mws-db', 1, (upgradeDB) => {
      upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
    }).then(db => {
        const tx = db.transaction('restaurants', 'readwrite');
        tx.objectStore('restaurants').put({
          id: restaurant.id,
          name: restaurant.name,
          neighborhood: restaurant.neighborhood,
          photograph: restaurant.photograph,
          address: restaurant.address,
          latlang: restaurant.latlng,
          cuisine_type: restaurant.cuisine_type,
          operating_hours: restaurant.operating_hours,
          reviews: restaurant.reviews
        });
        return tx.complete;
    });
  }

  static fetchFromCache() {
    idb.open('mws-db', 1, (upgradeDB) => {
      switch (upgradeDB.oldVersion) {
        case 0: 
          upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
      }
    }).then(db => {
      return db.transaction('restaurants')
      .objectStore('restaurants').getAll();
    }).then(objects => {return objects;});
  }

  static fetchReviewsByRestaurantId(restaurant) {
    fetch(`${DBHelper.DATABASE_URL}/reviews/?restaurant_id=${restaurant.id}`)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.log("Cannot get reviews");
        }
      })
      .then(result => {
        const reviews = result; 
        console.log(`DBHelper.fetchReviewsByRestaurantId returns: ${reviews} 
        (array of reviews)`);
        return reviews;
      }).catch(err => console.log(err));
  }
}

  
