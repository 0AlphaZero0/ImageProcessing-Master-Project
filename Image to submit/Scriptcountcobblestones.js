/*
* Counting method - to count the number of stones in a picture
* Thouvvenin Arthur
* 11/12/2017
*/

function countcobblestones(filename){
    let imp = IJ.openImage(filename);
    imp.show();
    let name=imp.getTitle();
    IJ.run("Canvas Size...", "width=360 height=360 position=Top-Left");
    IJ.run("Brightness/Contrast...");
    IJ.run("Enhance Contrast", "saturated=0.35");
    IJ.run("Apply LUT");
    IJ.run("Mean...", "radius=0.5");
    IJ.run("Brightness/Contrast...");
    IJ.run("Enhance Contrast", "saturated=0.35");
    IJ.run("Apply LUT");
    IJ.run("8-bit");
    IJ.setThreshold(0, 114);
    IJ.run("Apply LUT");
    IJ.run("Convert to Mask");
    IJ.run("Dilate");
    IJ.run("Dilate");
    IJ.run("Invert");
    IJ.run("Fill Holes");
    IJ.run("Analyze Particles...", "size=90-Infinity show=Outlines display clear");
    let table = Analyzer.getResultsTable();
    let index = table.getColumnIndex("Area");
    let areasindex = table.getColumn(index);
    Counter=0; // counter
    for (let i = 0; i < areasindex.length; i++){
	Counter++;
    }
    //IJ.log(areas);
    areas.push(Counter);
    names.push(name);
    imp.changes = false;
    imp.close(); 
}

/**********
 *  MAIN  *
 *********/

let areas=[];
let names=[];
let od = new OpenDialog("Choose file"); 
let folder = od.getDirectory();
let dir = new java.io.File(folder);
let files = dir.listFiles();

for (let i = 0; i<files.length; i++){
    /* 
     * loops to open all images
     */
    countcobblestones(files[i]); //call process function
}

let results = new ResultsTable();
for (let i = 0; i < areas.length; i++){
    results.incrementCounter();
    results.addValue('Area', areas[i]);
    results.addValue('Number of stones', names[i]);
}

results.showRowNumbers(true);
results.show('Number of stones per image');