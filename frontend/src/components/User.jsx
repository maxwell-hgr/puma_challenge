/* eslint-disable react/prop-types */

import "./User.css";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";

const User = ({ user, handleDelete, index, handleFavorite }) => {
  return (
    <a href={user.url} className="user-card-link">
      <div className="user-card">
        <img src={user.avatar} alt="Foto do perfil" />
        <p className="user-name">{user.name || "Usuário sem nome"}</p>
        <p className="user-username">{user.username}</p>
        {user.star ? (
          <FaStar
            onClick={(e) => {
              e.preventDefault();
              handleFavorite(user._id);
            }}
            className="user-star"
          />
        ) : (
          <FaRegStar
            onClick={(e) => {
              e.preventDefault();
              handleFavorite(user._id);
            }}
            className="user-star"
          />
        )}
        <button
          id={index}
          onClick={(e) => {
            e.preventDefault(); // Para evitar que o clique no botão de apagar acione o link
            handleDelete(index);
          }}
          className="user-delete-button"
        >
          <FaTrash />
        </button>
      </div>
    </a>
  );
};

export default User;
