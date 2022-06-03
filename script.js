// https://www.loc.gov/search/?q=baseball&fo=json | Search without format
// https://www.loc.gov/FORMAT/?q=civil war&fo=json | Search with format

var searchResultsEl = document.querySelector('#search-results');
var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var searchForm = document.querySelector('#loc-search-form');

var getSearchResults = function(q, format) {
  var searchURL;

  if (format) {
    searchURL = "https://www.loc.gov/" + format + "/?q=" + q + "&fo=json";
  } else {
    searchURL = "https://www.loc.gov/search/?q=" + q + "&fo=json";
  }

  fetch(searchURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
      searchResultsEl.innerHTML = null;
      for (var result of data.results) {
        /*
        <article class="card p-3 my-3 bg-dark text-light">
          <h3>Story Title</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ex, quisquam quasi aliquam iste nihil temporibus inventore unde, itaque sapiente error nesciunt nostrum modi. Ducimus placeat repellat voluptatibus adipisci rerum.</p>
          <button class="btn btn-light text-dark">Learn More</button>
        </article>
        */
        var articleEl = document.createElement('article');
        articleEl.className = "card p-3 my-3 bg-dark text-light";

        var h3El = document.createElement('h3');
        h3El.textContent = result.title;

        var pEl = document.createElement('p');
        pEl.textContent = result.description[0];

        var btnEl = document.createElement('a');
        btnEl.className = "btn btn-light text-dark";
        btnEl.textContent = "Learn More";
        btnEl.href = result.url;
        console.log(result)

        articleEl.append(h3El, pEl, btnEl);
        searchResultsEl.append(articleEl);

      
      }
    });
};

var init = function() {
  // DO SOMETHING WHEN REDIRECTED FROM INDEX PAGE
  if(location.search){
    var url = new URL(location.href);
    var q = url.searchParams.get('q');
    var format = url.searchParams.get('format');
      getSearchResults(q, format);

  }
};

var handleSearch = function(event) {
    event.preventDefault();
    var q = qInput.value.trim();
    var format = formatInput.value;
  
    if (!q) return;
  
    if (searchResultsEl) {
      getSearchResults(q, format);
    } else {
      location.replace('./search-results.html?q=' + q + "&format=" + format);
    }
  }

searchForm.addEventListener('submit', handleSearch);

init();