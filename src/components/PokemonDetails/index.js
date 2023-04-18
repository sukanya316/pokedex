// import {Component} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import {BsGenderFemale, BsGenderMale} from 'react-icons/bs'
// import Loader from 'react-loader-spinner'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'
// import Pokemon from '../Pokemon'
import './index.css'

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache(),
})

const pokemons = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`
function ExplorePokemons() {
  //   const history = useHistory()
  //   history.replace('/pokedex')
  console.log('explore')
  return <Redirect to="/pokedex" />
}

function GetPokemon() {
  const {number, name} = useParams()
  const {loading, error, data} = useQuery(pokemons, {
    variables: {first: 160},
  })
  console.log(name, error)
  const ind = Number(number) - 1
  const pokemon = loading ? {} : data.pokemons[ind]
  let evolutionsArr = []
  if (!loading) {
    evolutionsArr =
      ind > 2 ? data.pokemons.slice(ind, ind + 3) : data.pokemons.slice(0, 3)
  }

  return loading ? (
    <h1>....</h1>
  ) : (
    <div className="poke-details-container">
      <div className="name-number-container">
        <h1>{pokemon.name}</h1>
        <h1> #{pokemon.number}</h1>
      </div>
      <div className="img-container">
        <div className="poke-img-container">
          <img className="poke-img" src={pokemon.image} alt={pokemon.name} />
        </div>
        <div>
          <div>
            <p>
              When the bulb on its back grows large, it appears to lose the
              ability to stand on its hind legs.
            </p>
            <h2>Versions</h2>
          </div>
          <div className="height-weight-container">
            <div>
              <h4>Height: </h4>
              <p>{pokemon.height.minimum}</p>
            </div>
            <div>
              <h4>Weight: </h4>
              <p>{pokemon.weight.minimum}</p>
            </div>
            <div>
              <h4>Category: </h4>
              <p>{pokemon.classification}</p>
            </div>
            <div className="gender-container">
              <h4>Gender</h4>
              <BsGenderMale />
              <BsGenderFemale />
            </div>
          </div>
          <div className="type-container">
            <h2>Type</h2>
            {pokemon.types.map(type => (
              <button type="button" key={type} className="type-btn">
                {type}
              </button>
            ))}
          </div>
          <div className="weakness-container">
            <h2>Weaknesses</h2>
            {pokemon.weaknesses.map(weakness => (
              <button type="button" key={weakness} className="weaness-btn">
                {weakness}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2>Evolutions</h2> <br />
        <ul className="evalutions-container">
          {evolutionsArr.map(evalItem => (
            <li key={evalItem.id}>
              <div className="eval-poke-img-container">
                <img
                  src={evalItem.image}
                  alt={evalItem.name}
                  style={{backgroundColor: 'lightgray'}}
                  className="eval-img"
                />
              </div>
              <p>#{evalItem.number}</p>
              <h3>{evalItem.name}</h3>
              {evalItem.types.map(typ => (
                <button type="button" key={typ} className="type-btn">
                  {typ}
                </button>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="explore-btn" onClick={ExplorePokemons}>
        Explore More Pokemons
      </button>
    </div>
  )
}

const PokemonDetails = props => {
  console.log('details', props)
  return (
    <ApolloProvider client={client}>
      <GetPokemon />
    </ApolloProvider>
  )
}
export default PokemonDetails
