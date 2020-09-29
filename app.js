//read in the json data and populate dropdown
d3.json("samples.json").then(function(data){
    
    //sanity check
    console.log(data);

    //get the id's
    var ids = data.names;

    //sanity check
    //console.log(ids);

    //call on the function to populate the dropdown
    populateMenu(ids);
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

//event handler to track when a new id is selected
d3.selectAll("#selDataset").on("click", optionChanged);

//function to collect the selected id 
function optionChanged () {
    var selected = d3.select("#selDataset");
    var id = selected.property("value");

    //sanity check
    //console.log(id);

    //call on the function to create the plot
    barPlot(id);

    bubbleChart(id);
}

//function to create the plot
function barPlot(id) {

    //grab  the info needed
    d3.json("samples.json").then(function(data) {

        //var for the id's
        var ids = data.names;

        //var for the samples
        var samples = data.samples;

        //array to save the selected id's data
        var sampleValues = [];
        var otuIds = [];
        var otuLabels = [];

        //loop to search for the info on the selected id
        for (i = 0; i < ids.length; i++) {

            //conditional to pull the info it matches the selected id
            if (id == ids[i]) {
            
                //save the samples, otu_ids and otu_labels
                sampleValues = samples[i].sample_values;

                otuIds = samples[i].otu_ids;

                otuLabels = samples[i].otu_labels;

                //sanity check
                //console.log(sampleValues);
                //console.log(otuIds);
                //console.log(otuLabels);
            }
        }

        //sort the arrays in descending order to then select the first 10
        sampleValues = sampleValues.sort(function(a, b){return b-a});
        otuIds = otuIds.sort(function(a, b){return b-a});    

        //select only the top 10
        sampleValues = sampleValues.slice(1, 10);
        otuIds = otuIds.slice(Math.max(1, 10));

        //sanity check
        //console.log(sampleValues);
        //console.log(otuIds);

        //create the data array for the plot
        var trace1 = {
            //x: otuIds,
            x: sampleValues,
            type: "bar",
            orientation: 'h'
        };

        var tickvals = otuIds.map(function(e, i) {
            return i;
          });

        //create the array for the data
        var data = [trace1];

        //create the layout array for the plot
        var layout = {
            yaxis:{
                ticktext: otuIds,
                tickvals: tickvals
            },
            height: 600,
            width: 600,
        };

        Plotly.newPlot("bar", data, layout);
    });
}

//function for creating the bubble chart
function bubbleChart (id) {

    //grab  the info needed
    d3.json("samples.json").then(function(data) {

        //var for the id's
        var ids = data.names;

        //var for the samples
        var samples = data.samples;

        //array to save the selected id's data
        var sampleValues = [];
        var otuIds = [];
        var otuLabels = [];

        //loop to search for the info on the selected id
        for (i = 0; i < ids.length; i++) {

            //conditional to pull the info it matches the selected id
            if (id == ids[i]) {
            
                //save the samples, otu_ids and otu_labels
                sampleValues = samples[i].sample_values;

                otuIds = samples[i].otu_ids;

                otuLabels = samples[i].otu_labels;

                //sanity check
                console.log(sampleValues);
                console.log(otuIds);
                console.log(otuLabels);
            }
        }
    
    var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIds
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: '',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);
    });
}