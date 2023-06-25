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
      document.body.querySelector('#explanationText').textContent =
        data.completion.content;
    })
    .catch((error) => console.error('Error! promise failed: ', error));
}

chrome.runtime.onMessage?.addListener(({ name, data }) => {
  if (name !== 'readability-context') return;
  const selectionParagraphElement = document.querySelector('#selectedText');
  selectionParagraphElement.textContent = data.value;

  // display loading message
  document.body.querySelector('#explanationText').textContent = 'Loading...';

  // make API call
  explain(data.value);
});

// function handleClick() {
//   console.log('explain button clicked!');
//   const selectionParagraphElement =
//     document.body.querySelector('#selectedText');
//   const selectedText = selectionParagraphElement.textContent;
//   if (selectedText === '') {
//     console.log('text is null');
//     return;
//   }

//   document.body.querySelector('#explanationText').textContent = 'Loading...';
//   // explain(selectedText).then((result) => {
//   //   document.body.querySelector('#explanationText').textContent = result.data;
//   // });

//   explain(selectedText);
// }

// // add event listener to button
// document.querySelector('#explain-btn').addEventListener('click', handleClick);
