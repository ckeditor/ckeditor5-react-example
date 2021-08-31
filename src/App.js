
import React, { Component } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';

// NOTE: We use editor from source (not a build)!
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';

// original working config
// const editorConfiguration = {
//   plugins: [ Essentials, Bold, Italic, Paragraph ],
//   toolbar: [ 'bold', 'italic' ]
// };

// modified config with mentions
const editorConfiguration = {
  plugins: [Mention, Essentials, Bold, Italic, Paragraph],
  mention: {
    feeds: [{
      marker: '/',
      feed: getFeedItems
    }]
  },
  toolbar: ['bold', 'italic']
};

const items = [
  { id: 'option1', userId: '1', name: 'Option1', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
  { id: 'option2', userId: '2', name: 'Option2', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
  { id: 'option3', userId: '3', name: 'Option3', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
  { id: 'option4', userId: '4', name: 'Option4', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
  { id: 'option5', userId: '5', name: 'Option5', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' }
];

function getFeedItems( queryText ) {
  // As an example of an asynchronous action, return a promise
  // that resolves after a 100ms timeout.
  // This can be a server request or any sort of delayed action.
  return new Promise( resolve => {
      setTimeout( () => {
          const itemsToDisplay = items
              // Filter out the full list of all items to only those matching the query text.
              .filter( isItemMatching )
              // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
              .slice( 0, 10 );

          resolve( itemsToDisplay );
      }, 100 );
  } );

  // Filtering function - it uses the `name` and `username` properties of an item to find a match.
  function isItemMatching( item ) {
      // Make the search case-insensitive.
      const searchString = queryText.toLowerCase();

      // Include an item in the search results if the name or username includes the current user input.
      return (
          item.name.toLowerCase().includes( searchString ) ||
          item.id.toLowerCase().includes( searchString )
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 from source in React</h2>
        <CKEditor
          editor={ ClassicEditor }
          config={ editorConfiguration }
          data="<p>Hello from CKEditor 5!</p>"
          onInit={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
          } }
          onBlur={ editor => {
            console.log( 'Blur.', editor );
          } }
          onFocus={ editor => {
            console.log( 'Focus.', editor );
          } }
        />
      </div>
    );
  }
}

export default App;
