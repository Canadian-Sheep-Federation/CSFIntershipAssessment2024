import logo from './logo.svg';
import './App.css';
import './SpotifyAPI.js';

const thisForm = document.getElementById('postForm');
if (thisForm) {
  thisForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(thisForm).entries()
      const response = await fetch('http://localhost:3000/api/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData))
      });

      const result = await response.json();
      console.log(result);
      // const idForm = document.getElementById('idForm')
      // idForm.hidden = false
      // const requestID = document.getElementById('requestID')
      // requestID.value = result._id
  });
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form id="postForm">
          <div class="seeds">
              <div>
                <div>
                  <label >Seed 1:</label>
                  <input type="text" id="seed1" name="seed1" />
                </div>
                <div class="select">
                  <select name="seed1type" id="seed1type" required={true}>
                    <option defaultValue="" disabled>select type</option>
                    <option value="genre">Genre</option>
                    <option value="artist">Artist</option>
                    <option value="track">Song</option>
                  </select>
                </div>
                {/* <li id="seed1uri" hidden="true">
                  <label for="seed1">URI:</label>
                  <input type="text" id="seed1.code" name="seed1" />
                </li> */}
                <div class="button">
                  <button onClick="search(seed1, seed1type)">use this seed</button>
                </div>
              </div>
            {/* <ul>
              <li>
                <label for="seed2">Seed 2:</label>
                <input type="text" id="seed2" name="seed2" />
              </li>
              <li  class="select">
                <select name="type2" id="type2" required="true">
                  <option value="" disabled selected>select type</option>
                  <option value="genre">Genre</option>
                  <option value="artist">Artist</option>
                  <option value="track">Song</option>
                </select>
              </li>
              <li class="button">
                <button type="submit">use this seed</button>
              </li>
            </ul>
            <ul hidden="true">
              <li>
                <label for="seed3">Seed 3:</label>
                <input type="text" id="seed3" name="seed3" />
              </li>
              <li  class="select">
                <select name="type3" id="type3" required="true">
                  <option value="" disabled selected>select type</option>
                  <option value="genre">Genre</option>
                  <option value="artist">Artist</option>
                  <option value="track">Song</option>
                </select>
              </li>
              <li class="button">
                <button type="submit">use this seed</button>
              </li>
            </ul>
            <ul hidden="true">
              <li>
                <label for="seed4">Seed 4:</label>
                <input type="text" id="seed4" name="seed4" />
              </li>
              <li  class="select">
                <select name="type4" id="type4" required="true">
                  <option value="" disabled selected>select type</option>
                  <option value="genre">Genre</option>
                  <option value="artist">Artist</option>
                  <option value="track">Song</option>
                </select>
              </li>
              <li class="button">
                <button type="submit">use this seed</button>
              </li>
            </ul>
            <ul hidden="true">
              <li>
                <label for="seed5">Seed 5:</label>
                <input type="text" id="seed5" name="seed1" />
              </li>
              <li  class="select">
                <select name="type5" id="type5" required="true">
                  <option value="" disabled selected>select type</option>
                  <option value="genre">Genre</option>
                  <option value="artist">Artist</option>
                  <option value="track">Song</option>
                </select>
              </li>
              <li class="button">
                <button type="submit">use this seed</button>
              </li>
            </ul> */}
          </div>

          <div class="bpm">
            <ul>
              <li>
                <label for="min_bpm">Min bpm:</label>
                <input type="number" id="minbpm" name="minbpm" required="true" />
              </li>
              <li>
                <label for="max_bpm">Max bpm:</label>
                <input type="number" id="maxbpm" name="maxbpm" required="true" />
              </li>
            </ul>
          </div>

          <div class="button">
            <button type="submit">Create Playlist</button>
          </div>          
        </form>

        
        <form>
            <ul id="idForm" hidden="true">
              <li>
                <label for="min_bpm">requestID:</label>
                <input type="text" id="requestID" name="requestID" required="true" />
              </li>
            </ul>
        </form>
      </header>
    </div>
  );
}

export default App;
