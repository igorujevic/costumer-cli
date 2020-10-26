require('dotenv').config();
const mongoose = require('mongoose');
const customer = require('./models/customer');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.
  // To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
  useUnifiedTopology: true,
});

// Import model
const Customer = require('./models/customer');

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info('New Customer added');
    mongoose.connection.close();
  });
};

// Find Customer
const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      mongoose.connection.close();
    }
  );
};

// Update Customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer).then((customer) => {
    console.info('Customer updated.');
    mongoose.connection.close();
  });
};

// Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    console.info('Customer removed.');
    mongoose.connection.close();
  });
};

// List all Customers
const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    if (customers.length !== 1) console.info(`${customers.length} customers.`);
    else console.info(`${customers.length} customer.`);
    mongoose.connection.close();
  });
};

// Export All Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
