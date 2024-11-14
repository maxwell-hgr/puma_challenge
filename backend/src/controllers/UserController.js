import User from "../models/UserModel";
import reqUser from "../services/UserServices";

export const registerUser = async (req, res) => {
  const { user } = req.params;

  try {
    const already = await User.findOne({ username: user });

    if (already) return res.status(422).json({ error: "Usuário já existe!" });

    const users = await User.find();
    if (users.length >= 5) {
      return res.json({ error: "Limite de usuários atingido!" });
    }

    const gitReq = await reqUser("GET", user);

    if (gitReq.status === "404")
      return res.json({ error: "Usuário não existe" });

    const { login: username, name, avatar_url: avatar, html_url: url } = gitReq;

    const data = {
      username,
      name,
      avatar,
      url,
      star: false,
    };

    const newUser = await User.create(data);

    return res.json(newUser);
  } catch (error) {
    console.log("Erro ao registrar usuário: ", error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();

  return res.json(users);
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    return res.json(deletedUser);
  } catch (error) {
    console.log("Erro ao deletar usuário: ", error);
  }
};

export const starUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (user.star === true)
      return res.status(422).json({ error: "Usuário já favoritado!" });
    user.star = true;

    const favorite = await User.findOne({ star: true });

    if (favorite) {
      favorite.star = false;
      await User.findOneAndUpdate({ username: favorite.username }, favorite);
    }

    await User.findOneAndUpdate({ username: user.username }, user);
    return res.json(user);
  } catch (error) {
    console.log("Erro ao favoritar usuário: ", error);
  }
};
