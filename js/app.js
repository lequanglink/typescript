const PRODUCT_DATA = './mocks/product.json';
const productList = document.querySelector('.product-list');
const storeToLocalStorage = (data) => {
    if (localStorage.getItem('product')) {
    }
    else {
        localStorage.setItem("product", JSON.stringify(data));
    }
};
function getProduct(url) {
    fetch(url).then((res) => res.json().then((data) => {
        storeToLocalStorage(data.data);
        showProduct();
    }));
}
function showProduct() {
    const data = JSON.parse(localStorage.getItem('product') || '[]');
    const html = data.map((product) => {
        const { id, image_path, name, price } = product;
        return `
    <div class="col-md-4 text-center animate-box">
      <div class="product">
        <div class="product-grid" style="background-image:url(./images/${image_path});">
          <div class="inner">
            <p>
              <a href="single.html" class="icon"><i class="icon-shopping-cart"></i></a>
              <a href="single.html" class="icon"><i class="icon-eye"></i></a>
            </p>
          </div>
        </div>
        <div class="desc">
          <h3><a href="./single.html?id=${id}">${name}</a></h3>
          <span class="price">$${price}</span>
        </div>
      </div>
    </div>
    `;
    });
    productList.innerHTML = html.join('');
}
;
(() => {
    if (localStorage.getItem('product')) {
        showProduct();
    }
    else {
        getProduct(PRODUCT_DATA);
    }
})();
export {};
