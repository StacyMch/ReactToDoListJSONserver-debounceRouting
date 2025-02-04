export const apiURL = 'http://localhost:3006/notes';

export const fetchRequest = (method, { id, ...data } = {}) => {
	let url = apiURL;
	if (id !== undefined) {
		url += `/${id}`;
	}

	let options = {
		method,
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	};

	if (method !== 'GET' && method !== 'DELETE') {
		options.body = JSON.stringify(data);
	}

	// const fetchProduct = (id) => new Promise((resolve) => {
	// 	setTimeout(() => {
	// 	  resolve(database.products[id]);
	// 	}, 2500);
	//   });

	// return fetch(url, options)
	// 	.then((rawResponse) => rawResponse.json())
	// 	.catch((error) => {
	// 		console.error('Ошибка при отправке запроса:', error);
	// 	});
	return fetch(url, options).then((rawResponse) => {
		if (!rawResponse.ok) {
			// Если статус ответа не в диапазоне 200-299, выбрасываем ошибку
			// throw new Error(`Ошибка: ${rawResponse.status} ${rawResponse.statusText}`);
			throw new Error(rawResponse.status);
		}
		return rawResponse.json();
	});
};

export const createNote = (newNote) => fetchRequest('POST', newNote);

export const readNotes = () => fetchRequest('GET');

export const readNote = (noteId) => fetchRequest('GET', { id: noteId });

export const updateNote = (updatedNote) => fetchRequest('PATCH', updatedNote);

export const deleteNote = (noteId) => fetchRequest('DELETE', { id: noteId });
