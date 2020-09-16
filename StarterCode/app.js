// Use D3 fetch to read the JSON file
function buildData(sample) {    
    d3.json("samples.json").then((data) => {
        console.log(data)
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        //var plot = d3.select("");
        var CHART = d3.select("#sample-metadata");

        // Clear panel 
        CHART.html("");

        // Let use Object entries
        Object.entries(result).forEach(([key, value]) => {
            CHART.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}




  //Plotly.newPlot(CHART, data);
function buildCharts(sample){
    // read data with d3
    d3.json('samples.json').then((data) =>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids= result.otu_ids;
        var otu_labels = result.out_labels;
        var sample_values = result.sample_values;

        // Make a buuble chart

        var layout_b = {
            title: "Bacterias per Sample",
            margin: { t: 0},
            xaxis: { title: "OTU ID"},
            margin: {t: 30}

        };

        var data_b = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                 size: sample_values,
                 color: otu_ids,
                 colorscale: 'Electric'  
                } 
            }
        ];

        Plotly.newPlot("bubble", data_b, layout_b);
    

        // lets do the bar chart
        var yvalues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        //var xvalues = sampl
        var barData = [
            {
                y: yvalues,
                x: sample_values.slice(0, 10).reverse(),
                //text: otu_labels.slice(0, 10).reverse(),
                type:"bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacterias",
            margin: { t:30, l:159}
        };

        Plotly.newPlot("bar", barData, barLayout);
    });
}


//Create the function to get the necessary data
function getInfo() {
    // read the json file to get data
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        
        //Get the metadata info for the demographic panel
        var sampleNames = data.names;

        //console.log(metadata)

        //Filter metadata info by id
        sampleNames.forEach((sample)=>{
            selector
              .append("option")
              .text(sample)
              .property("value", sample);
        });

        var firstvalue = sampleNames[0];
        buildCharts(firstvalue);
        buildData(firstvalue);
    });
    
}

function optionChanged(othersample) {
    buildCharts(othersample);
    buildData(othersample);
}

// start the dashboard
getInfo();

