import { v4 as uuid } from "uuid";
import { Request, Response } from "express";

// Formato do objeto de usuário
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

// Banco de dados fictício
let users: User[] = [];

export default {
  async getUsers(_request: Request, response: Response) {
    const serializedUser = (user: User) => {
      return {
        ...user,
        password: undefined,
      };
    };

    return response.json({ users: users.map(serializedUser) });
  },

  async getUser(request: Request, response: Response) {
    // ID do usuário a ser buscado
    const id = request.params.id;

    // Buscar usuário
    const user = users.find((user) => user.id === id);

    // Verificar se o usuário existe
    if (!user) return response.status(404).json({ error: "User not found" });

    return response.json({ ...user });
  },

  async createUser(request: Request, response: Response) {
    const { name, surname, email, password } = request.body;

    if (!name || !surname || !email || !password)
      return response.status(400).json({ error: "Missing data" });

    const user = {
      id: uuid(),
      name,
      surname,
      email,
      password,
    };

    users.push(user);

    return response.status(201).json({ message: "User created" });
  },

  async deleteUser(request: Request, response: Response) {
    const id = request.params.id;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1)
      return response.status(404).json({ error: "User not found" });

    users = users.filter((user) => user.id !== id);

    return response.json({ message: "User deleted successfully" });
  },

  async updateUser(request: Request, response: Response) {
    const id = request.params.id;

    const user = users.find((user) => user.id === id);

    if (!user) return response.status(404).json({ error: "User not found" });

    const { name, surname, email, password } = request.body;

    if (!name || !surname || !email || !password)
      return response.status(400).json({ error: "Missing data" });

    const toUpdate = {
      name,
      surname,
      email,
      password,
    };

    Object.assign(user, toUpdate);

    return response.json({ message: "User updated successfully" });
  },

  async getUserByEmail(request: Request, response: Response) {
    // code here
    const email = request.params.email;

    console.log(email);

    const user = users.find((user) => user.email === email);

    if (!user) return response.status(404).json({ error: "User not found" });

    return response.json({ ...user, password: undefined });
  },
};
