// Use D3 fetch to read the JSON file
d3.json('data/samples.json').then((data) => {
    console.log(data)
}
var CHART = d3.selectAll("#plot").node();

  Plotly.newPlot(CHART, data);
  

//Use filter() to pass the function as its argument
var samples = data.samples.filter(s => s.id.toString() === id)[0];
//Check your filtered samples
console.log(samples);

//Get the top ten samples
var samplevalues = samples.sample_values.slice(0, 10).reverse();

//Reverse the array to accommodate Plotly defaults 
var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
//Use otu_ids as labels for bar chart
var otu_id = otu_top.map(d => 'otu' + d)

//Get the top ten otu labels for the bar chart 
var labels = samples.otu_labels.slice(0,10);

//Trace1 for the otu data
var trace1 = {
    x: samplevalues,
    y: OTU_id,
    text: labels,
    marker: {
      color: 'rgb(142,124,195)'},
    type:"bar",
    orientation: "h",
};

//Data
var data = [trace1]

//Create layout/apply the group bar more to the layout 
var layout = {
    title: 'Top 10 OTU',
    yaxis:{
        tickmode:'linear',
    },
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
    }
};

//Render the plot to the div tag with id 'plot'
Plotly.newPlot('plot', data, layout);

//Trace2 for the otu data
var trace1 = {
    x: samples.otu_ids,
    y: samples.sample_values,
    mode: 'markers',
    marker: {
        size: samples.sample_values,
        color: samples.otu_ids
    },
    text: samples.otu_labels

};

//Data
var data = [trace2]

//Resource used : https://plotly.com/javascript/bubble-charts/
//Create layout/apply the bubble chart to the layout 
var layout_b = {
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 1000
};

//Render the plot to the div tag with id 'plot'
Plotly.newPlot('bubble', data1, layout_b); 

//Create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("Data/samples.json").then((data)=> {
        
        //Get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        //Filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
