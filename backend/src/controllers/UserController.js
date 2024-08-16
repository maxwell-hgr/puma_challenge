import User from "../models/UserModel";
import reqUser from "../services/UserServices";

export const registerUser = async (req, res) => {
  // puxa user da url
  const { user } = req.params;

  const already = await User.findOne({ username: user });

  if (already) return res.status(422).json({ error: "Usuário já existe!" });

  // checa se já existem 5 usuários
  const users = await User.find();
  if (users.length >= 5) {
    return res.json({ error: "Limite de usuários atingido!" });
  }

  const gitReq = await reqUser("GET", user);

  if (gitReq.status === "404") return res.json({ error: "Usuário não existe" });

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
};

export const getUsers = async (req, res) => {
  const users = await User.find();

  return res.json(users);
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  const deletedUser = await User.findOneAndDelete({ username });

  return res.json(deletedUser);
};

export const starUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (user.star === true)
    return res.status(422).json({ error: "Usuário já favoritado!" });
  user.star = true;

  // se já houver um favorito, seta false para a star
  const favorite = await User.findOne({ star: true }); // true or false

  if (favorite) {
    favorite.star = false;
    await User.findOneAndUpdate({ username: favorite.username }, favorite);
  }

  // seta a star para o user selecionado
  await User.findOneAndUpdate({ username: user.username }, user);
  return res.json(user);
};
