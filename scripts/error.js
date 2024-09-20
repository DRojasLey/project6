const postTopContainer = document.getElementById('postTopContainer');
const sectionSubtitle = document.getElementById('sectionSubtitle');
const postContainer = document.getElementById('postContainer');
const postButton = document.getElementById('postButton');
const contitle = document.querySelector('.contitle');
const dataPost = document.getElementById('dataPost');
const form = document.getElementById('productForm');



let hasError = false;


postButton.addEventListener('click', async () => {
    const loadingImg = document.createElement('img');
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = parseFloat(document.getElementById('price').value);
    const errorTitle = document.createElement('h2')

    if (!name || !category || isNaN(price)) {
        errorTitle.innerText ='Please fill out all fields correctly (name, category, and numeric price).';
        errorTitle.setAttribute('id', 'error-message')
        errorTitle.setAttribute('class', 'error-message')
        form.appendChild(errorTitle)
        hasError = true;
        return;
    }
    if (hasError && document.getElementById('error-message')) {
        document.getElementById('error-message').remove();
        hasError = false;
    }
    const data = {
        name,
        category,
        price,
    };
    try {
        loadingImg.setAttribute('class', 'loading-img');
        loadingImg.setAttribute('src', '../resources/images/loading.gif');
        loadingImg.setAttribute('alt', 'loading Image');
        postTopContainer.appendChild(loadingImg)
        const response = await fetch('https://jsonplaceholder.typicodea.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const createdProduct = await response.json();
        let productArray = [createdProduct];
        createMenuItem(productArray)
    } catch (error) {
        loadingImg.remove();
        contitle.innerText = 'ERROR';
        errorTitle.innerText =`Error creating product: ${error}`;
        errorTitle.setAttribute('id', 'error-message')
        errorTitle.setAttribute('class', 'error-message')
        form.appendChild(errorTitle)
        hasError = true;
        return;
    }
});




/** gets an array and creates the menu elements
*
* @param {array} menuItems
*/
function createMenuItem(menuItems) {
    postButton.style.display ='none'

    menuItems.forEach(element => {
        let name, category, toppings, toppingsString , price ;
        const newLi = document.createElement('li')
        const newUl = document.createElement('ul')
        const newSubLi = document.createElement('li')
        const newh4 = document.createElement('h4')
        const newParagraphCategory = document.createElement('p')
        const newParagraphPrice = document.createElement('p')
        const newParagraphToppings = document.createElement('p')
        name = element.name
        category = element.category
        if (element.topping) toppings = element.topping ;
        price = element.price
        newh4.innerText = name;
        newParagraphCategory.innerText = `Delicious ${category}`;
        newParagraphPrice.innerText = `Price: ${price}`;
        if (element.topping){
            toppingsString = toppings.reduce((accumString, topping, index)=>{
                accumString += ` ${topping} \n ` ;
                return accumString;
            }, '')
            newParagraphToppings.innerText = `Toppings: \n ${toppingsString}`;
        }
        newSubLi.appendChild(newh4);
        newSubLi.appendChild(newParagraphCategory);
        if (element.topping) newSubLi.appendChild(newParagraphToppings);
        newSubLi.appendChild(newParagraphPrice);
        newUl.appendChild(newSubLi);
        newLi.appendChild(newUl)
        newLi.setAttribute('class', 'menuItemCard');
        dataPost.appendChild(newLi);
    });
};