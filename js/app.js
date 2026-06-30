/* =========================
        MARKETPRO APP JS
========================= */

/* DATA PRODUITS */
let products = [
    { id: 1, name: "Air Max Pro", price: 120, image: "assets/images/p1.jpg", likes: 0, comments: [] },
    { id: 2, name: "Smart Watch", price: 89, image: "assets/images/p2.jpg", likes: 0, comments: [] },
    { id: 3, name: "Casque Bass", price: 59, image: "assets/images/p3.jpg", likes: 0, comments: [] },
    { id: 4, name: "iPhone Style X", price: 699, image: "assets/images/p4.jpg", likes: 0, comments: [] },
    { id: 5, name: "Laptop Ultrabook", price: 899, image: "assets/images/p1.jpg", likes: 0, comments: [] },
    { id: 6, name: "Montre Connectée", price: 149, image: "assets/images/p2.jpg", likes: 0, comments: [] },
    { id: 7, name: "Chaussures Running", price: 95, image: "assets/images/p3.jpg", likes: 0, comments: [] },
    { id: 8, name: "Caméra 4K", price: 499, image: "assets/images/p4.jpg", likes: 0, comments: [] },
    { id: 9, name: "Sac Premium", price: 180, image: "assets/images/p1.jpg", likes: 0, comments: [] },
    { id: 10, name: "Écouteurs Pro", price: 129, image: "assets/images/p2.jpg", likes: 0, comments: [] }
];

/* LIKES STOCKÉS */
let likedProducts = new Set();

/* =========================
        RENDER PRODUITS
========================= */

function renderProducts() {
    const grid = document.querySelector(".product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    products.forEach(product => {

        const isLiked = likedProducts.has(product.id);

        grid.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="">
                </div>

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="price">${product.price} €</p>

                    <div class="stars">⭐⭐⭐⭐⭐</div>

                    <div class="actions">

                        <button class="like ${isLiked ? "active" : ""}" onclick="toggleLike(${product.id})">
                            ❤️ ${product.likes}
                        </button>

                        <button class="view" onclick="viewProduct(${product.id})">
                            Voir
                        </button>

                        <button class="buy">
                            Acheter
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}

/* =========================
        LIKE SYSTEM
========================= */

function toggleLike(id) {
    let product = products.find(p => p.id === id);

    if (!product) return;

    if (likedProducts.has(id)) {
        likedProducts.delete(id);
        product.likes--;
    } else {
        likedProducts.add(id);
        product.likes++;
    }

    renderProducts();
}

/* =========================
        VIEW PRODUCT
========================= */

function viewProduct(id) {
    localStorage.setItem("currentProduct", id);
    window.location.href = "produit.html";
}

/* INIT */
renderProducts();
/* =========================
        COMMENTS SYSTEM
========================= */

function addComment(productId, text) {

    if (!text || text.trim() === "") return;

    let product = products.find(p => p.id === productId);

    if (!product) return;

    product.comments.push(text);

    renderProducts();
}

/* =========================
        PRODUCT DETAIL (PAGE produit.html)
========================= */

function loadProductDetail() {

    const container = document.querySelector(".product-detail");

    if (!container) return;

    const id = Number(localStorage.getItem("currentProduct"));

    const product = products.find(p => p.id === id);

    if (!product) return;

    container.innerHTML = `
        <div class="detail-box">

            <img src="${product.image}" alt="">

            <div class="detail-info">

                <h2>${product.name}</h2>

                <p class="price">${product.price} €</p>

                <p>❤️ ${product.likes} likes</p>

                <p>💬 ${product.comments.length} commentaires</p>

            </div>

        </div>

        <div class="comment-section">

            <input type="text" id="commentInput" placeholder="Ajouter un commentaire...">

            <button onclick="submitComment(${product.id})">Envoyer</button>

            <div class="comment-list">

                ${product.comments.map(c => `<p>💬 ${c}</p>`).join("")}

            </div>

        </div>
    `;
}

/* =========================
        SUBMIT COMMENT
========================= */

function submitComment(id) {

    const input = document.getElementById("commentInput");

    if (!input) return;

    const text = input.value;

    addComment(id, text);

    input.value = "";

    loadProductDetail();
}

/* =========================
        INIT PAGE PRODUIT
========================= */

loadProductDetail();
/* =========================
        ADD PRODUCT (PAGE vendre.html)
========================= */

function addProduct(name, price, image) {

    if (!name || !price) return;

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: Number(price),
        image: image || "assets/images/default.jpg",
        likes: 0,
        comments: []
    };

    products.push(newProduct);

    renderProducts();

    if (typeof window.renderSellProducts === "function") {
        window.renderSellProducts();
    }

    if (typeof window.renderDiscoverProducts === "function") {
        window.renderDiscoverProducts();
    }
}

/* =========================
        FORM VENDRE
========================= */

const formVendre = document.querySelector("#form-vendre");

if (formVendre) {

    formVendre.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.querySelector("#productName").value;
        const price = document.querySelector("#productPrice").value;
        const image = document.querySelector("#productImage").value;

        addProduct(name, price, image);

        formVendre.reset();

        alert("Produit ajouté avec succès !");
    });
}

/* =========================
        UPLOAD IMAGE (BASE64)
========================= */

const imageInput = document.querySelector("#productImageFile");

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            const preview = document.querySelector("#previewImage");

            if (preview) {
                preview.src = e.target.result;
            }

            document.querySelector("#productImage").value = e.target.result;
        };

        reader.readAsDataURL(file);
    });
}

/* =========================
        NAVIGATION ACTIVE LINK
========================= */

const links = document.querySelectorAll(".navbar a");

links.forEach(link => {

    link.addEventListener("click", () => {

        links.forEach(l => l.classList.remove("active"));

        link.classList.add("active");
    });
});
