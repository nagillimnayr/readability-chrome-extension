// import { explain } from '../scripts/explain';

// const { default: explain } = await import('../scripts/explain.js');
async function explain(text) {
  // wrap text in quotations
  const message = `"${text}"`;

  // send text to API
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const explanationText = document.querySelector('#explanationText');
      const spinner = document.querySelector('#spinner');
      spinner.remove();
      explanationText.textContent = data.completion.content;
    })
    .catch((error) => console.error('Error! promise failed: ', error));
}

function loadingSpinner() {
  const spinner = document.createElement('div');
  spinner.id = 'spinner';
  spinner.classList.add(['loader']);
  return spinner;
}

chrome.runtime.onMessage?.addListener(({ name, data }) => {
  if (name !== 'readability-context') return;
  const selectionParagraphElement = document.querySelector('#selectedText');
  selectionParagraphElement.textContent = data.value;

  // display loading spinner
  const spinner = loadingSpinner();
  const explanationText = document.querySelector('#explanationText');
  explanationText.textContent = '';
  explanationText.appendChild(spinner);

  // make API call
  explain(data.value);
});
