//The first line uses the d3.selectAll() method to create an event listener.
d3.selectAll("body").on("change", updatePage);


//Whenever there is a change to the HTML body, the updatePage()function is called. That is, when an event occurs on the page, such as selection of a dropdown menu option, 
//the updatePage() function is triggered.
function updatePage() {
    var dropdownMenu = d3.selectAll("#selectOption").node();
    var dropdownMenuID = dropdownMenu.id;
    var selecedOption = dropdownMenu.value;

    console.log(dropdownMenuID);
    console.log(selecedOption);
};
