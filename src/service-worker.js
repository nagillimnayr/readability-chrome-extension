const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'readability-context',
    title: 'Readability',
    contexts: ['selection'],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data) => {
  chrome.runtime.sendMessage({
    name: 'readability-context',
    data: { value: data.selectionText },
  });
});

// chrome.action.onClicked.addListener(async (tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['scripts/script.js'],
//   });
// });

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
