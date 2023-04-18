// import {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

import Pokemon from './components/Pokemon'
// import PokemonItem from './components/PokemonItem'
import PokemonDetails from './components/PokemonDetails'

import './App.css'

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
let pokesData = {}

// function useGetData() {
//   const {loading, error, data} = useQuery(pokemons, {
//     variables: {first: 160},
//   })
//   return {loading, error, data}
// }

function DisplayPokemons() {
  const {loading, error, data} = useQuery(pokemons, {
    variables: {first: 160},
  })
  console.log(loading, error, data)

  if (!loading) {
    pokesData = {...data}
    return <Pokemon pokemons={data} loading={loading} />
  }
  return ''
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/pokedex/:number-:name">
              <PokemonDetails pokesData={pokesData} client={client} />
            </Route>
            <Route exact path="/pokedex">
              <DisplayPokemons />
            </Route>
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    </>
  )
}
