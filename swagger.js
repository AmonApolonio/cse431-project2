const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Project 2 API",
    description: "Project 2 API",
  },
  host: "localhost:3000",
  schemes: ['http', 'https'],
  definitions: {
    Product: {
      name: "Sample Product",
      description: "This is a sample product description.",
      price: 19.99,
      stockQuantity: 100,
      category: "Electronics",
      brand: "BrandName",
      rating: 4.5,
      reviewCount: 10
    },
    User: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      favoriteColor: "Blue",
      birthday: "1990-01-01",
      role: "user",
      isActive: true
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);