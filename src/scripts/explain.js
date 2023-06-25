export async function explain(text) {
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
