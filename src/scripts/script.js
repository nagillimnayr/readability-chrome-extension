function script() {
	// get user selection
	const selection = `"${window.getSelection()}"`;

	// send selected text to API call
	fetch('http://localhost:3000', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			message: selection,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			alert(data.completion.content);
		});
}

script();
