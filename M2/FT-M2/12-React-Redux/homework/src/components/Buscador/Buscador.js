import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addMovieFavorite, getMovies } from "../../actions"
import "./Buscador.css"

export class Buscador extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",   //este es el estado
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value })//aqui capto lo que el cliente escribió, con el value del input
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.getMovies(this.state.title) // --> ir a buscar la peli a la api y guardarla en redux
  }

  render() {
    const { title } = this.state
    // const {search} = this.props
    return (
      <div>
        <h2>Buscador de Peliculas</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              <label><spam>Película:</spam> </label>
              <input type="text" id="title" value={title} onChange={(e) => this.handleChange(e)} />
            </div>
            <button type="submit">BUSCAR</button>
        </form>

        <ol>
          {/* this.props.search --> si es un arreglo lo puedo recorrer y mostrar en pantalla */}
          {this.props.search.length > 0 ? (
            this.props.search.map((pelicula) => {
              console.log(pelicula)
              return (
                <li key={pelicula.imdbID}>
                  <Link to={`/movie/${pelicula.imdbID}`} >{/* aqui voy al detalle de la pelicula (movie)*/ }
                    <span>Titulo: {pelicula.Title},</span>
                  </Link>
                    <span> Año: {pelicula.Year}, </span>
                    <span> Tipo: {pelicula.Type}, </span>
                  <button onClick={() => this.props.addMovieFavorite(pelicula)}>{/* aqui adiciono a favoritos*/ }
                    Favoritos
                  </button>
                </li>
              )
            })
          ) : (
            <h5>No hay peliculas, realiza una busqueda!</h5>
          )}
        </ol>
      </div>
    )
  }
}
// const movies = useSelector( state => state.movies ) --> Compo Funcional

function mapStateToProps(state) {
  return {
    search: state.search,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
