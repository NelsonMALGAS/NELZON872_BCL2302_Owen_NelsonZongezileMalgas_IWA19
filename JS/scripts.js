
import { authors , books ,BOOKS_PER_PAGE ,genres } from "./data.js";


const matches = books 
let page = 1;
let range = books.length


const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

/**
 *
 * @param {event} Object
 *  This code defines a function toggleTheme and attaches
 * an event listener to a button element. The toggleTheme function takes an
 * event object as its parameter, and then it prevents the default behavior of
 * the event using the preventDefault method.
 */

const toggleTheme = (event) => {
    event.preventDefault();
    const bodyOfDocument = document.querySelector("body");
    const saveForm = document.querySelector('[data-settings-theme]');
    const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');
  
    if (saveForm.value === 'day') {
      
      bodyOfDocument.style.setProperty('--color-dark', day.dark);
      bodyOfDocument.style.setProperty('--color-light', day.light);
      dataSettingsOverlay.style.display = 'none';
    } else {
      
      bodyOfDocument.style.setProperty('--color-dark', night.dark);
      bodyOfDocument.style.setProperty('--color-light', night.light);
      dataSettingsOverlay.style.display = 'none';
    }

   
  };

  const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary");
  saveButton.addEventListener('click', toggleTheme );

//----------buttons , overlays and forms------------//
const dataSearchFirstButton = document.querySelector('[data-header-search]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataHeaderSettingsButton = document.querySelector('[data-header-settings]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const cancelSearchOverlayButton = document.querySelector('[data-search-cancel]')
const dataListButton = document.querySelector('[data-list-button]')
const bookPreviewOverlay = document.querySelector('[data-list-active]')
const dataSearchOverlayButton = document.querySelector("body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary")


 //---------------Event listeners and overlay displays/overlay hiding------------------------//

 dataSearchFirstButton.addEventListener('click' , ()=>{
    dataSearchOverlay.style.display = 'block'
    bookPreviewOverlay.style.display = 'none'
})

dataHeaderSettingsButton.addEventListener('click' , () =>{
    dataSettingsOverlay.style.display = 'block'
})
cancelSearchOverlayButton.addEventListener('click' ,()=>{
    dataSearchOverlay.style.display = ''

} )

const dataListCloseButton = document.querySelector('[data-list-close]')
    dataListCloseButton.addEventListener('click' , ()=>{
    bookPreviewOverlay.style.display = 'none'

    })

    dataSearchOverlayButton.addEventListener('click' , () =>{
      dataSearchOverlay.style.display = 'none'
    })
  
//-------------------------------------------------------------//

/**
 * The first part of the code is updating an HTML element with the innerHTML
   property to show a "Show more" button with a remaining book count. The second
   part of the code is adding an event listener to the "Show more" button, which
   increases the page count and extracts a subset of books from an array based
   on the page count and displays them using the createPreview function. It also
   updates the remaining book count dynamically based on the number of books
   left to display.

   The third part of the code includes event listener functions that are triggered
   when certain buttons are clicked. For example, when the dataSearchFirstButton is
   clicked, it displays a search overlay and hides the book preview overlay.
   Similarly, when the dataHeaderSettingsButton is clicked, it displays a settings
   overlay. Finally, there are two more event listeners for canceling search and
   settings overlays.
 */

document.querySelector('[data-list-button]').innerHTML = /**html */[

  `<span>Show more</span>
    <span class="list__remaining" data-list-remaining> (${books.length - 36})</span>`,
]
dataListButton.addEventListener('click' , (event) =>{
  event.preventDefault()
  page += 1
  let rangeMax = page * BOOKS_PER_PAGE
  let rangeMin = rangeMax - 36
  let extracted2 = books.slice(rangeMin, rangeMax)
  for (let { author, image, title, id, description, published} of extracted2) {
      const preview = createPreview({
          author,
          image,
          title,
          id,
          description,
          published
      })
    
      document.querySelector('[data-list-items]').appendChild(preview)
      document.querySelector('[data-list-remaining]').innerHTML = `(${matches.length - rangeMax > 0 ? matches.length - rangeMax : 0})`
  };
})


dataSettingsCancel.addEventListener('click' , ()=>{
    dataSettingsOverlay.style.display = 'none'
})

 cancelSearchOverlayButton.addEventListener('click' , () =>{
   dataSearchOverlay.style.display = ''
 })
//-----------------------------------------------------------------//


/**
 *
 * @param {*} param0 
 * @returns {preview}
 * There is a dataListButton that displays a "Show more" button and the
 * remaining number of items in the list. When the button is clicked, a
 * dataListButton click event listener increments the page number and slices the
 * books array to show more items. The newly added items are appended to the
 * existing list of items, and the remaining count is updated accordingly.
 */
function createPreview({ author, id, image, title ,description ,published }) {
    const preview = document.createElement('div')
    preview.classList.add('preview')
    preview.id = id
    const htmlBlock = /**html */
    `<div class = "preview__info" data-info-${id}>
    <img class = "preview__image"data-image-${id} src ="${image}">
     <h1 class = "preview__title"data-title-${id}>${title}</h1>
     <h2 class = "preview__author"data-author-${id}>${authors[author]}</h2>
     <dialog data-description-${id}>'${description}'</dialog>
     <dialog data-published-${id}>'${published}'</dialog>
    
    </div>`
    preview.innerHTML = htmlBlock
    return preview
}
  
let fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)
for (const { author, image, title, id ,description ,published } of extracted  ) {
    const preview = createPreview({
        author,
        id,
        image,
        title,
        description,
        published
    })

    fragment.appendChild(preview)
    
    preview.addEventListener('click' ,(event) =>{
      event.stopPropagation()   // stop bubbling
      const dataList = document.querySelector('[data-list-active]')
      dataList.style.display = 'block'
      const dataListBlurImg = document.querySelector('[data-list-blur]')
      const dataListImg = document.querySelector('[data-list-image]')
      const dataListTitle = document.querySelector('[data-list-title]')
      dataListTitle.focus()
      const dataListSubTitle = document.querySelector('[data-list-subtitle]')
      const dataListDescription = document.querySelector('[data-list-description]')
      
      const blur = document.querySelector(`[data-image-${event.target.id}]`).getAttribute('src')
      dataListBlurImg.setAttribute('src',blur ) 
      const img = document.querySelector(`[data-image-${event.target.id}]`).getAttribute('src')
      dataListImg.setAttribute('src' , img)

      dataListTitle.innerHTML = document.querySelector(`[data-title-${event.target.id}]`).innerHTML
      const year =  (document.querySelector(`[data-published-${event.target.id}]`).innerHTML)
      dataListSubTitle.innerHTML =year
      dataListDescription.innerHTML = document.querySelector(`[data-description-${event.target.id}]`).innerHTML
     
    } ) 
}

const data_list = document.querySelector('[data-list-items]')
 data_list.appendChild(fragment)




let genresFragment = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Genres'
genresFragment.appendChild(element)

for (let [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
     element.value = id
     element.innerText = name
     genresFragment.appendChild(element)

}
const overlayForm2 = document.querySelector('[data-search-genres]')
overlayForm2.appendChild(genresFragment)


let authorsFragment = document.createDocumentFragment()
const element2 = document.createElement('option')
element2.value = 'any'
element2.innerText = 'All Authors'
authorsFragment.appendChild(element2)

for (let [id2, name2] of Object.entries(authors)) {
    let element2 = document.createElement('option')
    element2.value = id2
    element2.innerText = name2
    authorsFragment.appendChild(element2)

}


const overlayFormAuthors = document.querySelector('[data-search-authors]')
overlayFormAuthors.appendChild(authorsFragment)

//----------------------------------------------------------------------------------//



/**
 * This code is a search function that takes user input from a search form and
   searches for books based on the title, author, and genre criteria. The
   function uses the FormData object to retrieve the search criteria and then
   iterates through the books array to find books that match the criteria.

  The authors and genres objects are converted into arrays for better performance,
  and the search criteria are matched against the values in these arrays.

  If a book matches all of the search criteria, it is added to the result array.
  The search results are then displayed in the HTML using the innerHTML property
  of the resultList element. If no results are found, a message is displayed
  instead.
 */

// Convert authors and genres objects into arrays for better performance
const authorsArr = Object.entries(authors);
const genresArr = Object.entries(genres);

const searchForm = document.querySelector('[data-search-form]');

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(searchForm);
      const searchTitle = formData.get('title').toLowerCase();
      const searchGenreKey = formData.get('genre');
      const searchGenre = searchGenreKey === 'any' ? 'All Genres' : genres[searchGenreKey];
      const searchAuthorKey = formData.get('author');
      const searchAuthor = searchAuthorKey === 'any' ? 'All Authors' : authors[searchAuthorKey];

      const booksArr = Object.values(books);
      const result = [];

      for (let i = 0; i < booksArr.length; i++) {
        const book = booksArr[i];

        // Check if book title includes search phrase
        const titleMatch = searchTitle === '' || book.title.toLowerCase().includes(searchTitle);

        // Check if book author matches selected author
        const authorMatch = searchAuthor === 'All Authors' || authorsArr.some(author => authors[author] === book[author] || authors[author] === searchAuthor);

        // Check if book genre matches selected genre
        const genreMatch = searchGenre === 'All Genres' || genresArr.some(genre => genres[genre] === book[genre] || genres[genre] === searchGenre);

        if (titleMatch && authorMatch && genreMatch) {
          result.push(book);
        }
      
      }

  //Display search results
  const resultList = document.querySelector('[data-list-items]');
  const dataListMessage = document.querySelector('[data-list-message]').innerHTML
  resultList.innerHTML = ''; // clear previous search results
  if (result.length > 0) {
    for (const book of result) {
      const bookElement = document.createElement('div');
      bookElement.classList.add('preview__info');
      bookElement.innerHTML = `
        <img class = "preview__image" src="${book.image}" alt="${book.title}">
        <h2 class = "preview__title">${book.title}</h2>
        <p class = "preview__author">Author: ${authors[book.author]}</p>
        <p class = "preview__genre">Genre: ${genres[book.genres]}</p>
        <p class = "preview__popularity">Popularity: ${book.popularity}</p>
      `;console.log(book.popularity)
      resultList.appendChild(bookElement);
    }
  } else {
    resultList.innerHTML = `<p>${dataListMessage}</p>`;
  }

});

//These are error checks to ensure that the books array and the range array are present and valid.

if (!books && !Array.isArray(books)) {
  throw new Error('Source required')
}  if (!range && range.length < 2){
   throw new Error('Range must be an array with two numbers')
}

