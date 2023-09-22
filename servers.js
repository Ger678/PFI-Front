console.log("servers")
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');

searchButton.addEventListener('click', function(e) {
    console.log(searchBox.value)
    searchBox.value = '';
});

searchBox.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        console.log(searchBox.value)
    }

    searchBox.value = '';
})
console.log(Document.location);
