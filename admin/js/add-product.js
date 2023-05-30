"use strict";
const addMovieBtn = document.getElementById('add-movie');
addMovieBtn?.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    const newData = [...data, {
            id: Number(document.getElementById('id').value),
            name: document.getElementById('title').value,
            image_path: document.getElementById('image_path').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
        }];
    localStorage.setItem('product', JSON.stringify(newData));
    location.reload();
});
