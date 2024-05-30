import React from 'react';
import axios from "axios";

class App extends React.Component {
  //the main state of the application
  state = {
    name:'',
    description: '',
    motto: '',
    sheep: []
  }

  //the full sheep list is requested each time the component mounts
  componentDidMount = () => {
    this.getSheeps();
  };

  //gets the full sheep list from the database
  getSheeps = () => {
    axios.get('http://localhost:3500/sheeps')
    .then((response) => {
      const data = response.data;
      this.setState({sheep: data});
      console.log('Data has been recieved!')
    })
    .catch(() => {
      alert('Error retrieving Data!')
    });
  }

  //displays the full list of sheep
  displaySheeps = (sheeps) =>{
    if(!sheeps.length) return <h1>bob</h1>;

    return sheeps.map((sheep, index) => (

      <div>
          <h3>{sheep.name}</h3>
          <p>{sheep.description}</p>
          <p>{sheep.motto}</p>
      </div>
    ))
  };

  //used to update each of the form fields as the user writes in them
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  }

  //submit button for the form
  submit = (event) => {
    event.preventDefault();

    //payload object to be delivered to the server
    const payload = {
      name: this.state.name,
      description: this.state.description,
      motto: this.state.motto
    }

    //Post request to the server with the created payload
    axios({
      url:'http://localhost:3500/sheeps',
      method: 'POST',
      data: payload
    })
      .then(()=> {
        console.log('Data has been sent to the server')
        this.resetUserInputs();
        this.getBlogPost();
      })
      //Error checking
      .catch(()=> {
        console.log('Interal server error')
      })
    
    
  };

  //Used to reset the form fielts on each submit
  resetUserInputs = () => {
    this.setState({
      name:'',
      description: '',
      motto: ''
    })
  }

  //Function to request a random quote from the public quotable api
  randomQuote = () => {
    axios.get('https://api.quotable.io/random')
    .then((response) => {
      const data = response.data;
      this.setState({motto: data.content});
      console.log(data)
      console.log('Data has been recieved!')
    })
    .catch(() => {
      alert('Error retrieving Data!')
    });
  }

  //Final rendering of the form and sheep list
  render(){
    return(
      <div>
        <h2>Welcome to the Sheep Database</h2>
          {/* Form Component */}
          <h2>Create a Sheep!</h2>
          <div className="form-input">
            <input 
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
              <textarea 
              name="description" 
              cols="30" 
              rows="5" 
              value={this.state.description} 
              placeholder="Description" 
              onChange={this.handleChange}
              style={{width: '42%'}}>
              </textarea>
          </div>
          <div className="form-input">
              <input
                style={{width: '42%'}}
                type="text"
                name="motto"
                placeholder='Motto'
                value={this.state.motto}
                onChange={this.handleChange}/>
                <button onClick={this.randomQuote}>Get a Random Motto</button>
          </div>
          <button type="submit" onClick={this.submit}>Submit</button>

        {/*List of Existing Sheep in the Database */}
        <div className="sheeps">
          {this.displaySheeps(this.state.sheep)}
        </div>
      </div>
    )
  }
}

export default App