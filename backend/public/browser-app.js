const url = '/api/v1/products';
const fileFormDOM = document.querySelector('.file-form');
const idInputDOM = document.querySelector('#id');
const nameInputDOM = document.querySelector('#name');
const descriptionInputDOM = document.querySelector('#description');
const priceInputDOM = document.querySelector('#price');
const quantityInputDOM = document.querySelector('#quantity');
const imageInputDOM = document.querySelector('#image');
const containerDOM = document.querySelector('.container');
let imageValue;

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

  console.log('Submitting form with data:', { idValue, nameValue, descriptionValue, priceValue, quantityValue, imageValue });

  try {
    const product = { itemId: idValue, itemName: nameValue, description: descriptionValue, price: priceValue, quantity: quantityValue, images: imageValue };

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

//fetchProducts();
