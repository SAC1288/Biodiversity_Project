//declare init function
    var selecor = d3.select("#selDataset");

    d3.json("samples.json").then(({names}) => {
        names.forEach((name) => {
            selecor
                .append("option")
                .text(name)
        });
        optionChanged();
    })

function optionChanged() {
    let option = d3.select('select').node().value;

    d3.json("samples.json").then(({metadata,samples}) => {
        var PANEL = d3.select("#sample-metadata");
        var meta = metadata.filter(sampleObj => sampleObj.id == option)[0];
        var sample = samples.filter(sampleObj => sampleObj.id == option)[0];
        

        PANEL.html("");
        Object.entries(meta).forEach(([key,val])=> {
            PANEL.append("h5").text(`${key}: ${val}`)
        });

        var { otu_ids,sample_values,otu_labels } = sample;
        console.log(sample);
        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x => 'OTU '+x),
              type: 'bar',
              orientation: "h",
              text: otu_labels
            }
          ];
        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };  
          
          Plotly.newPlot('bar', data, layout);
        
        var data2 = [
            {
                x: otu_ids,
                y: sample_values,
                mode: 'markers',
                marker: {
                    color: otu_ids,
                    colorscale: 'Jet',
                    size: sample_values

                },
                text: otu_labels
            } 
        ];

        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis: { title: "OTU ID" }
        };

            Plotly.newPlot('bubble', data2, layout2);
        var w_freq = meta.wfreq
        // var data3 = [
        //     {
            
        //         domain: { x: [0, 1], y: [0, 1] },
        //         value: w_freq,
        //         title: { text: "Wash Frequency" },
        //         type: "indicator",
        //         mode: "gauge+number",
        //         marker: {
        //         colors: [w_freq]},
        //         colorscale: ''
        //     }];

 var data3 = [
            {
            
                domain: { x: [0, 1], y: [0, 1] },
                value: w_freq,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number+delta",
    gauge: {
      axis: { range: [null, 10] },
      bar: { color: "black"},
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "limegreen" },
          { range: [8, 10], color: "green" },
      ],
         },
   
            }];
        var layout3 = { width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 }
        };
 
        Plotly.newPlot("gauge", data3, layout3);
        

    })
};

