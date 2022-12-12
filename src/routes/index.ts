import express, { Router } from "express"
import LoginRouter from "./login"
import OrderRouter from "./order"
import ProductRouter from './products'
import RegisterRouter from './register'
import CheckoutRouter from './checkout'
const route = Router()
route.use("/Products", express.static("Products"));
route.use("/login", LoginRouter)
route.use("/products", ProductRouter)
route.use("/orders", OrderRouter)
route.use("/register",RegisterRouter)
route.use("/checkout",CheckoutRouter)

export default route