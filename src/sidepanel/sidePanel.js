// import { explain } from '../scripts/explain';

// const { default: explain } = await import('../scripts/explain.js');
async function explain(text) {
  // send text to API
  const responseText = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.completion.content;
    });

  return responseText;
}

chrome.runtime.onMessage?.addListener(({ name, data }) => {
  if (name !== 'readability-context') return;
  const selectionParagraphElement = document.querySelector('#selectedText');
  selectionParagraphElement.textContent = data.value;
});

function handleClick() {
  const selectionParagraphElement =
    document.body.querySelector('#selectedText');
  const selectedText = selectionParagraphElement.textContent;
  if (selectedText === '') return;

  // explain(selectedText).then((result) => {
  //   document.body.querySelector('#explanationText').textContent = result.data;
  // });

  explain(selectedText)
    .then((result) => {
      document.body.querySelector('#explanationText').textContent = result.data;
    })
    .catch((error) => console.error('promise failed: ', error));
}

// add event listener to button
document.querySelector('#explain-btn').addEventListener('click', handleClick);
