const PRODUCT_DATA = '../mocks/product.json';
const popular = document.getElementById('product-body');
const storeToLocalStorage = (data) => {
    if (localStorage.getItem('product')) {
    }
    else {
        localStorage.setItem('product', JSON.stringify(data));
    }
};
function getPopular(url) {
    fetch(url).then((res) => res.json().then((data) => {
        storeToLocalStorage(data.data);
        showProduct();
    }));
}
const deleteItem = (id) => {
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    const newData = data.filter((product) => product.id !== id);
    localStorage.setItem('product', JSON.stringify(newData));
    location.reload();
};
function showProduct() {
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    data.forEach((product) => {
        const { id, image_path, name, price } = product;
        const productE2 = document.createElement('tr');
        productE2.innerHTML = `
    <td width="10"><input type="checkbox" name="check1" value="1"></td>
      <td>${id}</td>
      <td>${name}</td>
      <td><img src="../images/${image_path}" alt="" width="100px;"></td>
      <td><span class="badge bg-success">$${price}</span></td>
      <td>
        <button class="btn btn-delete btn-sm delete delete-product" type="button" title="Xóa"
        ><i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary btn-sm edit modify-product" type="button" title="Sửa" id="show-emp"
          data-toggle="modal" data-target="#ModalUP"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
    `;
        popular.appendChild(productE2);
    });
    addActions();
}
const addActions = () => {
    const deleteBtns = document.querySelectorAll('.delete-product');
    const updateBtns = document.querySelectorAll('.modify-product');
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    data.forEach((product, i) => {
        const { id } = product;
        deleteBtns[i].addEventListener('click', () => {
            deleteItem(id);
        });
        updateBtns[i].addEventListener('click', () => openUpdateModal(id));
    });
};
const openUpdateModal = (idSearch) => {
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    console.log(data);
    const product = data.find((product) => product.id === idSearch);
    const { id, image_path, name, price, description } = product;
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
              <label for="id">Id</label>
              <input type="text" class="form-control" id="id" value="${id}">
            </div>
            <div class="form-group">
              <label for="name">Tên</label>
              <input type="text" class="form-control" id="name" value="${name}">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="price">Giá</label>
              <input type="text" class="form-control" id="price" value="${price}">
            </div>
            <div class="form-group">
              <label for="image_path">Image</label>
              <input type="text" class="form-control" id="image_path" value="${image_path}">
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label for="description">Nội dung</label>
              <input type="text" class="form-control" id="description" value="${description}">
            </div>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary update-item" data-dismiss="modal">Cập nhật</button>
        <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
      </div>
    </div>
  `;
    const updateBtn = document.querySelector('.update-item');
    updateBtn.addEventListener('click', () => handleUpdateItem(id));
};
const handleUpdateItem = (idSearch) => {
    const data = JSON.parse(localStorage.getItem('product') || '{}');
    const newData = data.map((product) => {
        if (product.id === idSearch) {
            return {
                ...product,
                id: document.getElementById('id').value,
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                image_path: document.getElementById('image_path').value,
                description: document.getElementById('description')
                    .value,
            };
        }
        return product;
    });
    localStorage.setItem('product', JSON.stringify(newData));
    location.reload();
};
(() => {
    if (localStorage.getItem('product')) {
        showProduct();
    }
    else {
        getPopular(PRODUCT_DATA);
    }
})();
export {};
