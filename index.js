var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCatgory");
var productDesc = document.getElementById("productDesc");
var validateInputName = document.getElementById("validateInputName");
var validateInputPrice = document.getElementById("validateInputPrice");
var validateInputProduct = document.getElementById("validateInputProduct");
var buttonAdd = document.getElementById("buttonAdd");

var productContainer = [];

if (localStorage.getItem("productsData") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productsData"));
  displayProduct();
}

buttonAdd.addEventListener("click",function(e){
  var x =validationName();
  var i = validationPrice();
  var c = validationCategory();
  console.log(e);
  console.log(e.tabIndex);
  console.log(e.target.classList.contains("btn"));
  if ( x && i && c) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      descriotion: productDesc.value,
    };
    productContainer.push(product);
    localStorage.setItem("productsData", JSON.stringify(productContainer));
    displayProduct();
    clearForm();
  }
})

function displayProduct() {
  var cartona = "";
  for (var i = 0; i < productContainer.length; i++) {   
    cartona += `
            <tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].descriotion}</td>
            <td>
                <button class="btn btn-outline-info buttonUpdate" curentUpdate ="${i}"> 
                    Update
                </button>
            </td>
            <td>
                <button class="btn btn-outline-danger buttonDelete" currentDelete="${i}" > 
                    Delete
                </button>
            </td>
        </tr>`;
      
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

// Search Box 
var search = document.getElementById("search");
search.addEventListener("keyup",function(){
  var cartona = "";
  var term = search.value;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ||
      productContainer[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      cartona += `
        <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].descriotion}</td>
        <td>
                <button class="btn btn-outline-info buttonUpdate" curentUpdate ="${i}"> 
                    Update
                </button>
            </td>
            <td>
                <button class="btn btn-outline-danger buttonDelete" currentDelete="${i}" > 
                    Delete
                </button>
            </td>
    </tr>`;
    
    } else {
      console.log("not exist");
    }
    document.getElementById("tableBody").innerHTML = cartona;
  }
})
// Button delete 
document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains("buttonDelete")){
    var index = e.target.getAttribute("currentDelete");
    console.log(index);
    deleteProduct(index)}});

function deleteProduct(index) {
productContainer.splice(index, 1);
localStorage.setItem("productsData", JSON.stringify(productContainer));
displayProduct();
}

// update button
document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains("buttonUpdate")){
    var index = e.target.getAttribute("curentUpdate");
    update(index)}});
    
function update(index) {
  productName.value = productContainer[index].name;
  productPrice.value = productContainer[index].price;
  productCategory.value = productContainer[index].category;
  productDesc.value = productContainer[index].descriotion;
  var buttonUpdated = `<button class="btn btn-info submitUpdate" submitUpdateNum="${index}" >Update Product</button>`;
  document.getElementById("button").innerHTML = buttonUpdated;
  console.log(buttonUpdated);
}
document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains("submitUpdate")){
    var index = e.target.getAttribute("submitUpdateNum");
    updateProduct(index)}});
function updateProduct(index) {
  productContainer[index].name = productName.value;
  productContainer[index].price = productPrice.value;
  productContainer[index].category = productCategory.value;
  productContainer[index].descriotion = productDesc.value;
  buttonUpdated = `<button class="btn btn-info" id="buttonAdd">Add Product</button>`;
  document.getElementById("button").innerHTML = buttonUpdated;
  localStorage.setItem("productsData", JSON.stringify(productContainer));
  displayProduct();
  clearForm();
}

function validationName() {
  var regEx = /^[A-Z][a-z]{3,8}$/;
  var nonValidateInputName = document.getElementById("nonValidateInputName");
  if (regEx.test(productName.value)) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    nonValidateInputName.classList.replace("d-block", "d-none");
    validateInputName.classList.replace("d-none", "d-block");
    return true;
  } else {
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");
    validateInputName.classList.replace("d-block", "d-none");
    nonValidateInputName.classList.replace("d-none", "d-block");
  }
}
function validationPrice() {
  var regEx =/^([1-9][0-9]{3}|10000)$/;
  var nonValidateInputPrice = document.getElementById("nonValidateInputPrice");
  if (regEx.test(productPrice.value)) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    nonValidateInputPrice.classList.replace("d-block", "d-none");
    validateInputPrice.classList.replace("d-none", "d-block");
    return true;
  } else {
    productPrice.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");
    validateInputPrice.classList.replace("d-block", "d-none");
    nonValidateInputPrice.classList.replace("d-none", "d-block");
  }
}
function validationCategory() {
  var regEx =/^[A-Z][a-z]{1,5}$/;
  var nonValidateInputProduct = document.getElementById("nonValidateInputProduct");
  if (regEx.test(productCategory.value)) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
    nonValidateInputProduct.classList.replace("d-block","d-none");
    validateInputProduct.classList.replace("d-none", "d-block");
    return true;
  } else {
    productCategory.classList.remove("is-valid");
    productCategory.classList.add("is-invalid");
    validateInputProduct.classList.replace("d-block", "d-none");
    nonValidateInputProduct.classList.replace("d-none", "d-block");
  }
}

function clearForm() {
  // clear name input
  productName.value = "";
  validateInputName.classList.replace("d-block","d-none");
  productName.classList.remove("is-valid");
  // clear price Input
  productPrice.value = "";
  validateInputPrice.classList.replace("d-block","d-none");
  productPrice.classList.remove("is-valid");
  // clear category Input
  productCategory.value = "";
  validateInputProduct.classList.replace("d-block","d-none");
  productCategory.classList.remove("is-valid");

  productDesc.value = "";
}