import { Router } from "express";

import UsersController from "./controllers/UsersController";

const routes = Router();

routes.get("/", (_request, response) => {
  return response.json({ message: "Hello World" });
});

routes.get("/users", UsersController.getUsers);
routes.post("/users", UsersController.createUser);
routes.get("/users/:id", UsersController.getUser);
routes.delete("/users/:id", UsersController.deleteUser);
routes.put("/users/:id", UsersController.updateUser);

routes.get("/users/:email/email", UsersController.getUserByEmail);

export { routes };
