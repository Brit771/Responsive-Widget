const container = document.getElementById("container");

// API endpoint
const apiEndpoint = "";

//Fetch and parse the data from the API
const fetchRecommendations = async () => {
  try{
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data;
  } catch(error){
    console.error(error);
    throw new Error("Failed to fetch the data"); 
  }
};


//utility functions for elements and items creation:

const createRecElement = (elementType,attributes = {}, text) => {
  const element = document.createElement(elementType);
  if(attributes) {
    Object.entries(attributes).forEach(([att, value]) => {
      element.setAttribute(att, value);
    });
  }
  if (text){
    element.textContent = text;
  }
  return element;
};

const isHebrew = (title) => /[\u0590-\u05FF]/.test(title);

const createItemElement = item => {

  const itemElement = document.createElement("div");
  itemElement.className = "item";

  //create & append the recommendation elements:
  //Image
  const imageElement = createRecElement("img", { src: item.thumbnail[0].url});
  itemElement.appendChild(imageElement);
  //title
  const titleElement = createRecElement("h3",null, item.name);
  if (isHebrew(item.name)) {
    titleElement.setAttribute("dir", "rtl");
  }
  itemElement.appendChild(titleElement);
  //brand name
  const brandElement = createRecElement("p", null , item.branding);
  itemElement.appendChild(brandElement);
  //Category
  if (item.categories) {
      const categoryElement = createRecElement("cat",null , item.categories);
    itemElement.appendChild(categoryElement);
  }
  //Link
  const linkElement  = createRecElement("a", { href: item.url, target: "_blank" });
  linkElement.appendChild(itemElement);
  return linkElement;
};


// Fetch data from the API, generate the HTML, and append it to the container
fetchRecommendations()
  .then((data) => {
    const fragment = new DocumentFragment();
    data.list.forEach((item) => {
      const itemElement = createItemElement(item);
      fragment.appendChild(itemElement);
    });
    container.appendChild(fragment);
  })
  .catch(error => console.error(error));
  