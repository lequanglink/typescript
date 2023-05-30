const addMovieBtn = document.getElementById('add-movie') as HTMLElement;

addMovieBtn?.addEventListener('click', () => {
  const data= JSON.parse(localStorage.getItem('product') || '{}')
  const newData = [ ...data ,{
    id: Number((document.getElementById('id') as HTMLInputElement).value),
    name: (document.getElementById('title') as HTMLInputElement).value,
    image_path: (document.getElementById('image_path') as HTMLInputElement).value,
    price: (document.getElementById('price') as HTMLInputElement).value,
    description: (document.getElementById('description') as HTMLInputElement).value,
  }]
  localStorage.setItem('product', JSON.stringify(newData))
  location.reload()
})