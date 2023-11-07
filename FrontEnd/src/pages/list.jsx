import React, { useState } from 'react';
import json from './result.json';

function AutoCompleteApp() {
  const [suggestions, setSuggestions] = useState([]);

  const search = (event) => {
    let input = event.target.value;
    let matches = [];
    
    if (input.length > 1) {
      for (let i = 0; i < json.length; i++) {
        if (json[i].match(input)) {
          matches.push(json[i]);
        }
      }
    }
    
    setSuggestions(matches);
  };

  return (
    <div>
      <label>Search Here</label>&nbsp;&nbsp;
      <input onKeyUp={search} />
      <React.Fragment>
        <ul style={{ listStyleType: 'none' }}>
          {suggestions.map(res => (
            <li key={res}>
              {res}
            </li>
          ))}
        </ul>
      </React.Fragment>
    </div>
  );
}

export default AutoCompleteApp;
