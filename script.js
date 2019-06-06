'use strict';

function searchTerm(){
  const term = $('#js-handle-search').val();
  return term;
}

function fetchUserRepos() {
  fetch("https://api.github.com/users/" + searchTerm() + "/repos") 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => "Something went wrong, please try again later.");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#search-results').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#search-results').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p>${responseJson[i].description}</p>
      <p>Link to repo: <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )
  };
  $('.results').removeClass('hidden');
}

function handleForm() {
  $('form').submit(evt => {
    evt.preventDefault();
    console.log('Searching');
    fetchUserRepos();
  });
}

$(handleForm);