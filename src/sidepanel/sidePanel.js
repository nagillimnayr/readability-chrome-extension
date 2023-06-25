import { explain } from '../scripts/explain';

chrome.runtime.onMessage.addListener(({ name, data }) => {
  if (name !== 'readability-context') return;
  const sidePanel = document.body.querySelector('#sidePanel');
  const selectionParagraphElement = sidePanel.querySelector('#selectedText');
  selectionParagraphElement.textContent = data.value;
});

function handleClick() {
  const selectionParagraphElement =
    document.body.querySelector('#selectedText');
  const selectedText = selectionParagraphElement.textContent;
  if (selectedText === '') return;

  explain(selectedText).then((result) => {
    document.body.querySelector('#explanationText').textContent = result.data;
  });
}

// add event listener to button
document.body
  .querySelector('#explain-btn')
  .addEventListener('click', handleClick);
