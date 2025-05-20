import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser, User } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";

const signUp = async (request: Request<{}, {}, IUser>, response: Response) => {
  try {
    const { username, password, age, email, role } = request.body;
    const existUser = await User.exists({ username });
    if (existUser) {
      response.status(400).json({ message: "Username is already in use" });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      age,
      role,
    });
    response.status(201).json(user);
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Unable to create user." });
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      response.status(400).send("Username/password missing!");

      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      response.status(401).json({ message: "Username/password incorrect" });

      return;
    }

    const isValid: boolean = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = generateToken({
        username,
        userId: user._id,
        role: user.role,
      });

      response.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      response.status(200).json({ message: "Login success" });
    } else {
      response.status(401).json({ message: "Username/password incorrect" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Login error" });
  }
};

const logout = async (request: Request, response: Response) => {
  response.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  response.json({ message: "Logged out successfully" });
};

const getUserById = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  try {
    const user = await User.findById(request.params.id);

    if (!user) {
      response.status(404).json({ message: "User not found!" });

      return;
    }

    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Unable to get user" });
  }
};

const editUserProfile = async (
  request: Request<{ id: string }, {}, Partial<IUser>>,
  response: Response
) => {
  try {
    const { username, password, age, email } = request.body;

    const updateUser: Partial<IUser> = { username, age, email };

    if (password) {
      updateUser.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(request.params.id, updateUser, {
      new: true,
    });

    if (!user) {
      response.status(404).json({ message: "User not found!" });
      return;
    }

    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Unable to update user" });
  }
};

const getUserCookie = (request: Request, response: Response) => {
  const SECRET_KEY = process.env.JWT_SECRET || "jfdhuifhkewuhr";
  const token = request.cookies?.token;
  console.log(token);

  if (!token) {
    response.status(401).json({ message: "No token provided" });

    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // if (decoded.role === "client") {
    //     response.status(422).json({ message: "Permission not allowed" });
    //     return;
    // }

    response.status(200).json(decoded);
    return;
  } catch (err) {
    response.status(403).json({ message: "Invalid token" });

    return;
  }
};

export default {
  signUp,
  login,
  logout,
  getUserById,
  editUserProfile,
  getUserCookie,
};
