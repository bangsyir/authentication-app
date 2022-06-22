import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("something wrong");
  }
};

export const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ message: "password doesn't match!" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const createUser = await Users.create({
      name,
      email,
      password: hash,
    });
    return res.status(201).json({ message: "register success", createUser });
  } catch (error) {
    return res.status(500).json("something wrong");
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: "wrong email or password" });
    }
    const { id, name, email } = user;
    const accessToken = jwt.sign(
      { userId: id, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId: id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: id,
        },
      }
    );
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "email not found" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  return res.clearCookie("refreshToken").sendStatus(200);
};
