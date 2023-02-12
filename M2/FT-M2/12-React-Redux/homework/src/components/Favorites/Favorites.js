import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { removeMovieFavorite } from "../../actions";
import "./Favorites.css";

export class ConnectedList extends Component {
  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
          {this.props.favorites?.map((peli) => {//aqui mapeo lo que este en el estado global de Redux, especificamente "favorites"
            return (
              <li>
                <Link to={`/movie/${peli.imdbID}`} >
                    <span>Titulo: {peli.Title},</span>
                </Link>
                <span> Año: {peli.Year}, </span>
                <span> Tipo: {peli.Type}, </span>
                <button onClick={() => this.props.removeMovieFavorite(peli.imdbID)}>
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
        <Link to = "/">
          <button>Volver a Home</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
  };
}

export default connect(mapStateToProps, { removeMovieFavorite })(ConnectedList);
