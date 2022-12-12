
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { Errormiddlewear } from "./utils/errorhandler";
import Pagenotfound from "./utils/pagenotfound";
import cors from "cors"
import config from './config';
import Applicatinroutes from './routes'
import sharp from "sharp"
// import faker from 'faker'
// import * as faker from 'faker';
// const fake=faker()
dotenv.config();
const app = express();
const port = process.env.port || config.port || 8000;
const options = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "B2C",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://192.168.5.21:${port}`
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(Applicatinroutes)
app.use(Pagenotfound)
app.use(Errormiddlewear)
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
  console.log(`Click to Open http://localhost:${port}/api-docs`);
});
async function resizeImage() {
  try {
    await sharp("sammy.png")
      .resize({
        width: 150,
        height: 97
      })
      .toFormat("jpeg", { mozjpeg: true })
      .toFile("sammy-resized-compressed.jpeg");
  } catch (error) {
    console.log(error);
  }
}
function generatekaedata(){
  // faker.name.firstName()
}