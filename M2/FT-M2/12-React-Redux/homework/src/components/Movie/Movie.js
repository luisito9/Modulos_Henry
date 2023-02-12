import React from "react";
import { connect } from "react-redux";
import { getDetail } from "../../actions/index";
import "./Movie.css";
import {Link} from "react-router-dom"

class Movie extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    // despachar la accion que busca(id)
    this.props.getDetail(id); // despacho la accion con el id que saque del params en la URL
  }

  render() {
    return (
      <div className="movie-detail">
        <h2>Titulo: {this.props.detail.Title}</h2>
        <h3> Año: {this.props.detail.Year}</h3>
        <img src={this.props.detail.Poster} alt="img" />
       <h5>Descripcion: {this.props.detail.Plot}</h5>
        <Link to = "/">
          <button>Volver a Home</button>
        </Link>
      <div>
        <Link to = "/favs">
          <button>Ir a Favoritos</button>
        </Link>
      </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDetail: (id) => dispatch(getDetail(id)),
  };
}

function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
