const deleteButton = document.getElementById('deleteButton');
const deleteContainer = document.getElementById('deleteContainer');

async function sendDeleteRequest() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/2', {
      method: 'DELETE',
    });

    if ( !response.ok ) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.status;

    console.log( 'Response from server:', response );

    const consoleText = document.createElement( 'pre' );
    consoleText.textContent = `DELETE Request Status:\n\n${JSON.stringify( data, null, 2)} \n \n browser console updated`;
    consoleText.classList.add( 'retro-console' );
    deleteContainer.appendChild( consoleText );
  } catch ( error ) {

    const errorMessage = document.createElement('p');
    errorMessage.textContent = `Error: ${error.message}`;
    errorMessage.classList.add( 'error-message' );
    deleteContainer.appendChild( errorMessage );
  }
}

deleteButton.addEventListener('click', sendDeleteRequest );