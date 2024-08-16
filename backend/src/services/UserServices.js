const api = "https://api.github.com/users/";

const reqUser = async (method, username) => {
  const url = api + username;
  const res = await fetch(url, { method: method })
    .then((res) => res.json())
    .catch((err) => err);

  return res;
};

export default reqUser;
