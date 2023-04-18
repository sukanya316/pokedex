import {Component} from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import arrayShuffle from 'array-shuffle'
import PokemonItem from '../PokemonItem'
import './index.css'

class Pokemon extends Component {
  state = {
    pokemonsArr: [],
    searchedVal: '',
    searchRes: [],
    showAdvancedSearch: false,
  }

  componentDidMount() {
    const {pokemons} = this.props
    this.setState({
      pokemonsArr: pokemons.pokemons.slice(0, 30),
      searchRes: pokemons.pokemons.slice(0, 30),
    })
  }

  onSearchPokemon = event => {
    const {pokemonsArr} = this.state
    const searchArr = pokemonsArr.filter(
      pokemonObj =>
        pokemonObj.name.includes(event.target.value) ||
        pokemonObj.number.includes(event.target.value),
    )
    this.setState({searchedVal: event.target.value, searchRes: searchArr})
    console.log(searchArr)
  }

  onSortBy = event => {
    const {pokemonsArr} = this.state
    console.log('sort', pokemonsArr)
    let sortRes = []
    if (event.target.value === 'lowest-number') {
      sortRes = pokemonsArr.sort((a, b) => a.number - b.number)
    } else if (event.target.value === 'highest-number') {
      sortRes = pokemonsArr.sort((a, b) => a.number - b.number)
      sortRes = sortRes.reverse()
    } else if (event.target.value === 'a-z') {
      sortRes = pokemonsArr.sort((a, b) => (a.name > b.name ? 1 : -1))
    } else {
      sortRes = pokemonsArr.sort((a, b) => (a.name < b.name ? 1 : -1))
    }
    this.setState({searchRes: sortRes})
  }

  onSurpriseClicked = () => {
    const {pokemonsArr} = this.state
    const shuffled = arrayShuffle(pokemonsArr)
    this.setState({pokemonsArr: shuffled, searchRes: shuffled})
  }

  loadMorePokemons = () => {
    const {pokemons} = this.props
    const {pokemonsArr} = this.state
    let loadArrRes = pokemons.pokemons.slice(
      pokemonsArr.length,
      pokemonsArr.length + 30,
    )
    loadArrRes = pokemonsArr.concat(loadArrRes)
    this.setState({pokemonsArr: loadArrRes, searchRes: loadArrRes})
  }

  onArrowClicked = () => {
    console.log('sff')
    this.setState(prevState => ({
      showAdvancedSearch: !prevState.showAdvancedSearch,
    }))
  }

  render() {
    const {loading, pokemons} = this.props
    const {pokemonsArr, searchedVal, searchRes, showAdvancedSearch} = this.state
    console.log('pokemon render', pokemons, pokemonsArr)
    return (
      <div className="main-container">
        <h1 style={{margin: '0'}}> Pokemon</h1>
        <div className="search-container">
          <div>
            <h2>Name Or Number</h2>
            <input
              type="search"
              placeholder="Search by name or number"
              value={searchedVal}
              onChange={this.onSearchPokemon}
            />
            <p>
              Use the Advanced search to explore pokemon by type, weakness,
              ability and more.
            </p>
          </div>
          <div className="search-green-card">
            <p>
              Search for Pokemon by name or using its National Pokedex Number.
            </p>
          </div>
        </div>
        <div className="advanced-search-container">
          <div className="arrow-container">
            <span>Show Advanced Search</span>
            {showAdvancedSearch ? (
              <MdOutlineKeyboardArrowDown
                className="arrow"
                onClick={this.onArrowClicked}
              />
            ) : (
              <MdOutlineKeyboardArrowUp
                className="arrow"
                onClick={this.onArrowClicked}
              />
            )}
          </div>
          {showAdvancedSearch ? (
            <div>Advanced Search Yet to Implement</div>
          ) : (
            ''
          )}
        </div>
        <div className="surprise-sort-container">
          <button
            type="button"
            className="surprise-btn"
            onClick={this.onSurpriseClicked}
          >
            Surprise Me!
          </button>
          <div>
            <label htmlFor="sort-by">Sort By</label>
            <select
              type="select"
              name="sort-by"
              id="sort-by"
              onChange={this.onSortBy}
              className="sort-element"
            >
              <option value="lowest-number">Lowest Number (First)</option>
              <option value="highest-number">Highest Number (First)</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
        <ul className="pokemon-items-container">
          {loading
            ? 'Loading.....'
            : searchRes.map(pokemon => (
                <PokemonItem key={pokemon.number} pokemonData={pokemon} />
              ))}
        </ul>
        <div style={{textAlign: 'center'}}>
          <button
            type="button"
            onClick={this.loadMorePokemons}
            className="load-more-btn"
          >
            Load More Pokemon...
          </button>
        </div>
      </div>
    )
  }
}

export default Pokemon
