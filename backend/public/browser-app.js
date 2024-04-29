const url = '/api/products';
const fileFormDOM = document.querySelector('.file-form');
const idInputDOM = document.querySelector('#id');
const nameInputDOM = document.querySelector('#name');
const descriptionInputDOM = document.querySelector('#description');
const priceInputDOM = document.querySelector('#price');
const quantityInputDOM = document.querySelector('#quantity');
const imageInputDOM = document.querySelector('#image');
const categoryDropdown = document.querySelector('#category'); 
const containerDOM = document.querySelector('.container');
let imageValue;

async function populateCategories() {
  try {
    const response = await axios.get('/api/categories');
    const categories = response.data.categories;

    categoryDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select category';
    defaultOption.value = ''; 
    categoryDropdown.appendChild(defaultOption);

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category._id; 
      option.text = category.categoryName;
      categoryDropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

populateCategories();

imageInputDOM.addEventListener('change', async (e) => {
  const imageFiles = e.target.files;

  if (!imageFiles || imageFiles.length === 0) {
    return;
  }

  const formData = new FormData();

  for (const imageFile of imageFiles) {
    formData.append('images', imageFile);
  }

  try {
    const { data: { images } } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    imageValue = images;
    console.log("ya ha "+images)
  } catch (error) {
    imageValue = null;
    console.error('Error uploading images:', error);
  }
});

fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idValue = idInputDOM.value;
  const nameValue = nameInputDOM.value;
  const descriptionValue = descriptionInputDOM.value;
  const priceValue = priceInputDOM.value;
  const quantityValue = quantityInputDOM.value;
  const categoryValue = categoryDropdown.value;


  try {
    const product = { itemId: idValue, itemName: nameValue, description: descriptionValue, price: priceValue, quantity: quantityValue, category: categoryValue, images: imageValue };
    const response = await axios.post(url, product);

    console.log('Form submitted successfully:', response.data);

    fetchProducts();
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message);
  }
});

async function fetchProducts() {
  try {
    const { data: { products } } = await axios.get(url);

    const productsDOM = products.map((product) => {
      return `<article class="product">
        <img src="${product.images[0]}" alt="${product.name}" class="img"/>
        <footer>
          <p>${product.itemName}</p>
          <span>$${product.price}</span>
        </footer>
      </article>`;
    }).join('');
    containerDOM.innerHTML = productsDOM;
  } catch (error) {
    console.log(error);
  }
}
