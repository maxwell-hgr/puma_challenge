const api = "http://localhost:3000/users/";

const reqUser = async (method, username) => {
  let url = api;
  if (username) url += username;
  if (method === "PATCH") url += "/toggle-star";

  console.log(url);
  const res = await fetch(url, {
    method: method,
  })
    .then((res) => res.json())
    .catch((err) => err);

  return res;
};

export default reqUser;
