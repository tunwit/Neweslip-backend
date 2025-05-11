import { drizzle } from "drizzle-orm/mysql2";
import Elysia from "elysia";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import jwt from "@elysiajs/jwt";
import auth from "./auth";

const public_route = new Elysia().use(auth);

export default public_route;
