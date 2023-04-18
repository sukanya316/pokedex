import {Link, withRouter} from 'react-router-dom'
import './index.css'

const PokemonItem = props => {
  const {pokemonData} = props
  const {number, image, name, types} = pokemonData

  return (
    <Link
      to={`/pokedex/${number}-${name}`}
      style={{textDecoration: 'none', color: 'black'}}
    >
      <li className="pokemon-item-card">
        {console.log('above link')}

        <div className="pokemon-img-container">
          <img
            src={image}
            alt={name}
            style={{backgroundColor: 'lightgray'}}
            className="pokemon-img"
          />
        </div>
        <p>#{number}</p>
        <h3>{name}</h3>
        {types.map(typ => (
          <button type="button" key={typ} className="type-btn">
            {typ}
          </button>
        ))}
      </li>
    </Link>
  )
}
export default withRouter(PokemonItem)
