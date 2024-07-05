import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Merry Match API",

    description: "Merry Match API documentation",
  },

  host: "localhost:4000",

  schemes: ["http"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./server.mjs"]; // Add more endpoint files as needed

swaggerAutogen()(outputFile, endpointsFiles);
