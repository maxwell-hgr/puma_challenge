import { useEffect, useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";

import User from "./components/User";
import reqUser from "./services/ApiService";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const handleFavorite = async (userId) => {
    const user = users.find((user) => user._id === userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, star: true } : { ...user, star: false }
      )
    );
    const res = await reqUser("PATCH", user.username);
    if (res.error) return setError(res.error);
  };

  const getUsers = async () => {
    const res = await reqUser("GET");
    setUsers(res);
  };

  const handleDelete = async (index) => {
    const targetIndex = parseInt(index); // Converter o índice para número

    const { username } = users[targetIndex];

    try {
      // Fazer a requisição para deletar o usuário
      await reqUser("DELETE", username);

      // Atualizar o estado removendo o usuário com o índice `targetIndex`
      setUsers((prevItems) => [
        ...prevItems.slice(0, targetIndex), // Parte do array antes do índice `targetIndex`
        ...prevItems.slice(targetIndex + 1), // Parte do array após o índice `targetIndex`
      ]);
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await reqUser("POST", user);

    if (res.error) {
      setError(res.error);
      return;
    }

    setUsers((prevUsers) => [...prevUsers, res]);
    setUser("");
  };

  const orderUsers = () => {
    // Cria uma nova cópia ordenada do array de usuários
    const sortedUsers = [...users].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setUsers(sortedUsers);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div className="app-container">
        <div className="icon-container">
          <FaSortAlphaDown className="sort-icon" onClick={orderUsers} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <input type="submit" value="Adicionar" />
          {error && <p className="error-message">{error}</p>}
        </form>
        {users.length === 0 ? (
          <p className="no-users-message">Ainda não há usuários</p>
        ) : (
          <div className="users-container">
            {users.map((user, index) => (
              <User
                key={index}
                index={index}
                user={user}
                handleDelete={handleDelete}
                handleFavorite={handleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
