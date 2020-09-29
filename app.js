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

    pieChart(id);

    metaData(id);
}

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

                break;
            }
        }

        //sort the arrays in descending order to then select the first 10
        sampleValues = sampleValues.sort(function(a, b){return b-a});
        otuIds = otuIds.sort(function(a, b){return b-a});    

        //select only the top 10
        sampleValues = sampleValues.slice(0, 10);
        otuIds = otuIds.slice(Math.max(0, 10));

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
            width: 400,
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
                //console.log(sampleValues);
                //console.log(otuIds);
                //console.log(otuLabels);

                break;
            }
        }
    
    //var to hold thedata info to be plotted
    var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        text: otuLabels,
        marker: {
          size: sampleValues,
          color: otuIds
        }
      };
      
      var data = [trace1];
      
      //var to hold the layout info of the graph
      var layout = {
        xaxis: {
            title: {
              text: "OTU ID's"
            }
        },
        showlegend: false,
        height: 600,
        width: 1000
      };
      
      //create the new plot
      Plotly.newPlot('bubble', data, layout);
    });
}

//function to get and fill in the meta data for the selected id
function pieChart (id) {
    //grab  the info needed
    d3.json("samples.json").then(function(data) {

        //var for the id's
        var ids = data.names;

        //var for the samples
        var samples = data.samples;

        //array to save the selected id's data
        var sampleValues = [];
        var otuIds = [];

        //loop to search for the info on the selected id
        for (i = 0; i < ids.length; i++) {

            //conditional to pull the info it matches the selected id
            if (id == ids[i]) {
            
                //save the samples, otu_ids and otu_labels
                sampleValues = samples[i].sample_values;

                otuIds = samples[i].otu_ids;

                //sanity check
                //console.log(sampleValues);
                //console.log(otuIds);

                break;
            }
        }

        //sort the arrays in descending order to then select the first 10
        sampleValues = sampleValues.sort(function(a, b){return b-a});
        otuIds = otuIds.sort(function(a, b){return b-a});    
        
        //select only the top 10
        sampleValues = sampleValues.slice(0, 10);
        otuIds = otuIds.slice(Math.max(0, 10));

        //create the variable to hold the graph data
        var data = [{
            values: sampleValues,
            labels: otuIds,
            type: "pie"
        }];
    
        //create the variable to hold the graph layout
        var layout = {
            height: 600,
            width: 600
        };

        //create the new plot
        Plotly.newPlot('gauge', data, layout);
    });
}

//function to grab and fill in the metadata
function metaData(id) {
    
    //grab  the info needed
    d3.json("samples.json").then(function(data) {

        //var for the id's
        var meta = data.metadata;

        //loop to search for the info on the selected id
        for (i = 0; i < meta.length; i++) {

            //conditional to pull the info it matches the selected id
            if (id == meta[i].id) {
        
                //save the meta data for the selected id
                var age = meta[i].age;
                var bbtype = meta[i].bbtype;
                var ethnicity = meta[i].ethnicity;
                var gender = meta[i].gender;
                var location = meta[i].location;
                var wfreq = meta[i].wfreq;
            
                //sanity check
                //console.log(id);
                //console.log(ethnicity);
                //console.log(gender);
                //console.log(age);
                //console.log(location);

                break;
            }
        }
        
        //array to hold all of the meta data
        var metaData = [];


        metaData = [{"AGE": age,
            "BB TYPE": bbtype,
            "ETHNICITY": ethnicity,
            "GENDER": gender,
            "LOCATION": location,
            "WFREQ": wfreq,
            "SAMPLE": id}];

        var str = '<p>Age: <span id="age"></span></p><p>BB TYPE: <span id="bbtype"></span></p><p>ETHNICITY: <span id="ethnicity"></span></p><p>GENDER: <span id="gender"></span></p><p>LOCATION: <span id="location"></span></p><p>WFREQ: <span id="wfreq"></span></p><p>SAMPLE: <span id="id"></span></p>';

        document.getElementById( 'sample-metadata' ).innerHTML = str;
        document.getElementById("age").innerHTML = age;
        document.getElementById("bbtype").innerHTML = bbtype;
        document.getElementById("ethnicity").innerHTML = ethnicity;
        document.getElementById("gender").innerHTML = gender;
        document.getElementById("location").innerHTML = location;
        document.getElementById("wfreq").innerHTML = wfreq;
        document.getElementById("id").innerHTML = id;

    });
}
