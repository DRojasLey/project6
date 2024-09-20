const getData = document.getElementById('dataGet')
const getButton = document.getElementById('getButton')
const restaurantName = document.getElementById('sectionSubtitle')


/** Hides DOM elements stored in an array
* 
* @param {array} elementToHide Array of DOM elements
*/
function hideOutput( elementsToHide ) {
    elementsToHide.forEach(element => {
        element.style.display = 'none'
    });
}


const getRestaurant = async () => {
    const response = await fetch('http://private-anon-0f37f24d5f-pizzaapp.apiary-mock.com/restaurants/');
    const data = await response.json() // get data from the promise
    return data;
}

/** GET method retrieve the default example
* 
* @returns data after parsing it to an object
*/
const getMenu = async () => {
    const response = await fetch('https://private-anon-0f37f24d5f-pizzaapp.apiary-mock.com/restaurants/1/menu');
    const data = await response.json() // get data from the promise
    return data;
}

/** Add the event listener to the button, shows the data
*
*/
getButton.addEventListener('click' , () => {
    getRestaurant().then(
        data => {
            restaurantName.innerText = data[0].name ;
        })
        getMenu().then(
            data => {
                createMenuItem(data)
                restaurantName.style.display = 'block';
            })
            .catch( error => console.error(error));
        })
        /** gets an array and creates the menu elements
        *
        * @param {array} menuItems
        */
        function createMenuItem(menuItems) {
            getButton.style.display ='none'
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
                getData.appendChild(newLi);
            });
        };