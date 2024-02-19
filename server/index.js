const db = require('./db');
const client = db.client;
const createTables = db.createTables;
const createCustomer = db.createCustomer;
const createRestaurant = db.createRestaurant;
const fetchCustomers = db.fetchCustomers;
const fetchRestaurants = db.fetchRestaurants;
const createReservation = db.createReservation;
const fetchReservations = db.fetchReservations;
const destroyReservation = db.destroyReservation;

const init = async()=> {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');
    const [moe, lucy, ethyl, burger_king, white_castle, taco_bell, pizza_hut] = await Promise.all([
        createCustomer({name: 'moe'}), 
        createCustomer({name: 'lucy'}),
        createCustomer({name: 'ethyl'}),
        createRestaurant({name: 'burger king'}),
        createRestaurant({name: 'white castle'}),
        createRestaurant({name: 'taco bell'}),
        createRestaurant({name: 'pizza hut'})
    ]);
    console.log(await fetchCustomers());
    console.log(await fetchRestaurants());
    const reservation = await createReservation({
        reservation_date: '03/15/2024',
        restaurant_id: white_castle.id,
        customer_id: lucy.id
    });
    console.log(await fetchReservations(lucy.id));
    await destroyReservation(reservation);
    console.log(await fetchReservations(lucy.id));
};

init();