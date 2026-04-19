/*ملاحظة تم تخزين ال  (opject)  localStorageضمن ال  */

const products = [
  {
    id: 0,
    image: "./assets/img/p1.png",
    title: "VS Pace Mens Trainers",
    price: 120,
    discount: 50,
  },
  {
    id: 1,
    image: "./assets/img/p2.png",
    title: "Infernus V3",
    price: 100,
    discount: 0,
  },
  {
    id: 2,
    image: "./assets/img/p3.png",
    title: "Alpha All-Purpose Gen Z",
    price: 20,
    discount: 30,
  },
  {
    id: 3,
    image: "./assets/img/p4.png",
    title: "A11 Sky",
    price: 20,
    discount: 15,
  },
  {
    id: 4,
    image: "./assets/img/p5.png",
    title: "Urban Tracks ",
    price: 100,
    discount: 0,
  },
  {
    id: 5,
    image: "./assets/img/p6.png",
    title: "Court Vision",
    price: 20,
    discount: 0,
  },
  {
    id: 6,
    image: "./assets/img/p7.png",
    title: "Classic Core 99",
    price: 20,
    discount: 15,
  },
  {
    id: 7,
    image: "./assets/img/p8.png",
    title: "Quick Pace V2",
    price: 100,
    discount: 10,
  },
  {
    id: 8,
    image: "./assets/img/p9.png",
    title: "Air Max T6 Waterproof ",
    price: 20,
    discount: 0,
  },
  {
    id: 9,
    image: "./assets/img/p10.png",
    title: "High Breed F2",
    price: 20,
    discount: 40,
  },
];






/*Element*/
const allProducts=document.getElementById("all-products")
const discountt=document.querySelectorAll(".discount")
const inputSearch=document.getElementById("search")
const countcart=document.getElementById("count")
const showProdects=document.querySelector(".show-prodects")
const total=document.getElementById("total")

/*localStorage*/
// localStorage.setItem('products',JSON.stringify(products))
const productsSaved=JSON.parse(localStorage.getItem("products"))||products

/*=====createProdect====== */
function projects(list) {
  allProducts.innerHTML = "" 
  list.forEach(product => {
    allProducts.innerHTML += `
      <div class="box">
        ${product.discount > 0 ? `<span class="discount">${product.discount}% OFF</span>` : ""}
        <div class="img-box">
          <img class="images" src="${product.image}" />
        </div>
        <div class="bottom">
          <p>${product.title}</p>
          <div>
              <span>${finalPrice(product) +"$"}</span>
              ${product.discount > 0 ? `<del>${product.price +"$"} </del>` :""}
          </div>
          <button class="addCart" id="${product.id}">Add to cart</button>
        </div>
      </div>`
  });
}
projects(productsSaved)

/*==========filterSearch===========*/
inputSearch.addEventListener('input' , ()=>{
  const content= inputSearch.value.toLowerCase()

  const filterSearch= productsSaved.filter(product=>{
    return product.title.toLowerCase().includes(content);
    })
    projects(filterSearch)
  })
  

/*===========IconCart============ */
cartIcon.addEventListener('click',(c)=>{
  // cart.style.display= cart.style.display==="block" ? "none" :"block"
  overlay.classList.toggle("active")
  cart.classList.toggle("active")
})
overlay.addEventListener('click' ,()=>{
 cart.classList.remove("active")
  overlay.classList.remove("active")
})

/*=====get cartItemes ===========*/
let cartItmes= JSON.parse(localStorage.getItem("cartItmes"))||[];
updateCount()

// functions===============
/* ===========buldingProduct========= */
function buildingProduct(product) {
  return `<tr id="row-${product.id}">
            <td> <img src="${product.image}" width="50"/></td>
            <td>${product.title}</td>
            <td>${finalPrice(product) +"$"}</td>
            <td><button class="DeleteProduct" id="${product.id}">Delete</button></td>
          </tr>`
}

/*============Total============ */
function sumTotal(totalPrice=0) {
  cartItmes.forEach(product => {
     totalPrice += finalPrice(product)
   
   });
   total.textContent = "$" +totalPrice
 } 
 sumTotal()

/* =======count========== */
function updateCount() {
  countcart.textContent=cartItmes.length
}

/* ==========Price==========*/
function finalPrice(p) {
  return p.price -(p.price*p.discount /100)
 }

//=====================================================
/* =====عرض المنتجات الموجودة مسبقا ====== */
showProdects.innerHTML=""
cartItmes.forEach(product=>{
  showProdects.innerHTML+= buildingProduct(product);
})

allProducts.addEventListener('click',(a)=>{
  if (a.target.classList.contains("addCart")) {

    let id=a.target.id
    const product=productsSaved.find(p=>p.id==id)
    const notrepe=cartItmes.find(p=>p.id==id)
     if (notrepe) return

    cartItmes.push(product)
    localStorage.setItem('cartItmes', JSON.stringify(cartItmes));
   
    updateCount()
   
    showProdects.innerHTML+= buildingProduct(product);
    
    sumTotal()
  }
})

/*========DeleteProduct========*/
showProdects.addEventListener('click',(e)=>{
  if (e.target.classList.contains("DeleteProduct")) {
      
    let id= e.target.id
    cartItmes =cartItmes.filter(p=>p.id !=id)
    localStorage.setItem('cartItmes',JSON.stringify(cartItmes))
    const row=document.getElementById(`row-${id}`)
    row.remove()

    updateCount()
    sumTotal()
    
   }
    
})

 
