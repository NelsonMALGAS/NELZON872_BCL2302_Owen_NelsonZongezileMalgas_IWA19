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

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'


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


const dataSearchFirstButton = document.querySelector('[data-header-search]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataHeaderSettingsButton = document.querySelector('[data-header-settings]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const searchOverlayCancelButton = document.querySelector('[data-search-cancel]');
const cancelSearchOverlayButton = document.querySelector('[data-search-cancel]')
const dataListButton = document.querySelector('[data-list-button]')
const bookPreviewOverlay = document.querySelector('[data-list-active]')
const dataSearchOverlayButton = document.querySelector("body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary")


dataListButton.innerHTML = /* html */ [
     `<span>Show more</span>
     <span class="list__remaining">(${range - [page * BOOKS_PER_PAGE ]})</span>`,
 ]
 
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
      searchForm.style.display = ''
    })
  

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



if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}  if (!range && range.length < 2){
     throw new Error('Range must be an array with two numbers')
}



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
      const dataList = document.querySelector('[data-list-active]')
      dataList.style.display = 'block'
      const dataListBlurImg = document.querySelector('[data-list-blur]')
      const dataListImg = document.querySelector('[data-list-image]')
      const dataListTile = document.querySelector('[data-list-title]')
      dataListTile.focus()
      const dataListSubTitle = document.querySelector('[data-list-subtitle]')
      const dataListDescription = document.querySelector('[data-list-description]')
      
      const blur = document.querySelector(`[data-image-${event.target.id}]`).getAttribute('src')
      dataListBlurImg.setAttribute('src',blur ) 
      const img = document.querySelector(`[data-image-${event.target.id}]`).getAttribute('src')
      dataListImg.setAttribute('src' , img)

      dataListTile.innerHTML = document.querySelector(`[data-title-${event.target.id}]`).innerHTML
      const year =  new Date (document.querySelector(`[data-published-${event.target.id}]`).innerHTML).getFullYear()
      dataListSubTitle.innerHTML = `${year}`
      dataListDescription.innerHTML = document.querySelector(`[data-description-${event.target.id}]`).innerHTML
     
    } )
}

const data_list = document.querySelector('[data-list-items]')
 data_list.appendChild(fragment)

// data-list-items.appendChild(fragment)


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

//const searchFormButton = document.querySelector("body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary")





// Convert authors and genres objects into arrays for better performance
const authorsArr = Object.entries(authors);
const genresArr = Object.entries(genres);

const searchForm = document.querySelector('[data-search-form]');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const searchTitle = formData.get('title').toLowerCase();
  const searchGenreKey = formData.get('genre');
  const searchGenre = searchGenreKey === 'any' ? null : genres[searchGenreKey];
  const searchAuthorKey = formData.get('author');
  const searchAuthor = searchAuthorKey === 'any' ? null : authors[searchAuthorKey];

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
      `;
      resultList.appendChild(bookElement);
    }
  } else {
    resultList.innerHTML = `<p>${dataListMessage}</p>`;
  }

  console.log(`Search Title: ${searchTitle}`);
  console.log(`Search Genre: ${searchGenre}`);
  console.log(`Search Author: ${searchAuthor}`);
});

// data-search-authors.appendChild(authors)



// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)







//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
