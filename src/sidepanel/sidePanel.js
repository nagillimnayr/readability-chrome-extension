chrome.runtime.onMessage.addListener(({ name, data }) => {
  if (name !== 'readability-context') return;
  const sidePanel = document.body.querySelector('#sidePanel');
  const selectionParagraphElement = sidePanel.querySelector('.selectedText');
  selectionParagraphElement.textContent = data.value;
});
