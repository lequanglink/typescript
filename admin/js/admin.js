const MOVIE_DATA = '../mocks/movies.json';
const POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';
const popular = document.getElementById('product-body');
let movieGenresLookup = {};
let tvGenresLookup = {};
const storeToLocalStorage = (data, type) => {
    if (localStorage.getItem(type)) {
    }
    else {
        localStorage.setItem(type, JSON.stringify(data));
    }
};
function getPopular(url) {
    fetch(url).then((res) => res.json().then((data) => {
        movieGenresLookup = data.genres;
        storeToLocalStorage([data.results, data.genres], 'movie');
        showMovie();
    }));
}
function showMovie() {
    const [data, genres] = JSON.parse(localStorage.getItem('movie') || '{}');
    data.forEach((movie) => {
        const { title, id, poster_path, vote_average, release_date, genre_ids } = movie;
        const renderGenre = genre_ids
            ?.map((id) => {
            return `<li><a href="#">${genres[id]}</a></li>`;
        })
            ?.join('') || '';
        const movieE2 = document.createElement('tr');
        movieE2.innerHTML = `
    <td width="10"><input type="checkbox" name="check1" value="1"></td>
      <td>${id}</td>
      <td>${title}</td>
      <td><img src="${poster_path
            ? POSTER_BASE_URL + poster_path
            : 'http://via.placeholder.com/192x270'}" alt="" width="100px;"></td>
      <td><span class="badge bg-success">${release_date}</span></td>
      <td>${vote_average}</td>
      <td>${renderGenre}</td>
      <td><button class="btn btn-delete btn-sm" type="button" title="Xóa"
          onclick="deleteItem(${id})"><i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary btn-sm edit" type="button" title="Sửa" id="show-emp"
          data-toggle="modal" data-target="#ModalUP" onclick="openUpdateModal(${id})"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
    `;
        popular.appendChild(movieE2);
    });
}
const deleteItem = (id) => {
    const [data, genres] = JSON.parse(localStorage.getItem('movie') || '{}');
    const newData = data.filter((movie) => movie.id !== parseInt(id));
    localStorage.setItem('movie', JSON.stringify([newData, genres]));
    location.reload();
};
const openUpdateModal = (id) => {
    const [data] = JSON.parse(localStorage.getItem('movie') || '{}');
    const movie = data.find((movie) => movie.id == id);
    const { title, poster_path, backdrop_path, vote_average, overview, release_date, genre_ids } = movie;
    const renderGenre = genre_ids
        .map((id) => {
        return `${id}, `;
    })
        .join('');
    const modal = document.getElementById('modal-content-body');
    modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-body">
        <div class="row">
          <div class="form-group  col-md-12">
            <span class="thong-tin-thanh-toan">
              <h5>Chỉnh sửa thông tin sản phẩm cơ bản</h5>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Tên phim</label>
              <input type="text" class="form-control" id="name" value="${title}">
            </div>
            <div class="form-group">
              <label for="release_date">Ngày phát hành</label>
              <input type="text" class="form-control" id="release_date" value="${release_date}">
            </div>
            <div class="form-group">
              <label for="vote_average">Đánh giá</label>
              <input type="text" class="form-control" id="vote_average" value="${vote_average}">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="poster_path">Poster Url</label>
              <input type="text" class="form-control" id="poster_path" value="${poster_path}">
            </div>
            <div class="form-group">
              <label for="backdrop_path">Poster Url</label>
              <input type="text" class="form-control" id="backdrop_path" value="${backdrop_path}">
            </div>
            <div class="form-group">
              <label for="genres">Id Thể loại</label>
              <input type="text" class="form-control" id="genres" value="${renderGenre}">
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label for="name">Nội dung</label>
              <input type="text" class="form-control" id="overview" value="${overview}">
            </div>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="handleUpdateItem(${id})" class="btn btn-primary" data-dismiss="modal">Cập nhật</button>
        <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
      </div>
    </div>
  `;
};
const handleUpdateItem = (id) => {
    const [data, genres] = JSON.parse(localStorage.getItem('movie') || '{}');
    const newData = data.map((movie) => {
        if (movie.id == id) {
            return {
                ...movie,
                title: document.getElementById('name').value,
                poster_path: document.getElementById('poster_path').value,
                backdrop_path: document.getElementById('backdrop_path').value,
                vote_average: document.getElementById('vote_average').value,
                release_date: document.getElementById('release_date').value,
                genre_ids: document.getElementById('genres').value.split(','),
                overview: document.getElementById('overview').value,
            };
        }
        return movie;
    });
    localStorage.setItem('movie', JSON.stringify([newData, genres]));
    location.reload();
};
(() => {
    if (localStorage.getItem('movie')) {
        showMovie();
    }
    else {
        getPopular(MOVIE_DATA);
    }
})();
export {};
