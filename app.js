//read in the json data and populate dropdown
d3.json("samples.json").then(function(data){
    
    //sanity check
    console.log(data);

    //get the id's
    var ids = data.names;

    //sanity check
    console.log(ids);

    populateMenu(ids)
});

//function to poluate the dropdown
function populateMenu (ids) {

    //This is not my code! I had trouble finding out how to fill in the drop down menu so i found this on stack overflow.
    //I simply modified it to fit the specifics of my code.
    //https://stackoverflow.com/questions/11255219/use-a-javascript-array-to-fill-up-a-drop-down-select-box
    var sel = document.getElementById('selDataset');
    var fragment = document.createDocumentFragment();

    ids.forEach(function(id, index) {
        var opt = document.createElement('option');
        opt.innerHTML = id;
        opt.value = id;
        fragment.appendChild(opt);
    });

    sel.appendChild(fragment);
}