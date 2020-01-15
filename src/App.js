import React, {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component.jsx';
import {SearchBox} from './components/search-box/search-box.component.jsx';


class App extends Component{
  constructor(){
    super();
    //state sesuatu yang berubah
    //untuk pass down ke little komponen, membutuhkan props
    this.state = {
      monsters: [],
      searchField: ''
    }
    //no need bind anymore...
    //this.handleChange = this.handleChange.bind(this);
  }

  //mounting is when react puts our component on the page, in renders the DOM for the first time
  componentDidMount(){
    //fetching all data on the page
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(respons=>respons.json())
    .then(users=>this.setState({monsters:users}));
  }

  //Note: Use arrow function on any class methods you define and aren't part of React(render() or componentDidMount())
  //arrow function
  handleChange = (e) => {
    //cara kerja async???!!
    this.setState({searchField:e.target.value});
  }

  render(){
    const {monsters, searchField} = this.state;
    //const monsters = this.state.monsters;
    //const searchField = this.state.searchField;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    return(
      //jsx mimmick html
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monster' 
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters}/>
    </div>
    );
  }
}

export default App;
