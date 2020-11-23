let net;

var predList = []
var probList = []


async function app() {
    console.log('Loading mobilenet ...');

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    // Make a prediction through the model on our image
    //const imgEl = document.getElementById('img');
    // const result = await net.classify(imgEl);
    //console.log(result);
    return net
}

async function pred() {

    // Make a prediction through the model on our image
    const imgEl = document.getElementById('img');
    const result = net.classify(imgEl);
    console.log(result);
    var test = await result.then(predictions => predictions)
    predList.splice(0, 1,test[0].className)
    predList.splice(1,1,test[1].className)
    predList.splice(2,1,test[2].className)
    probList.splice(0,1,test[0].probability)
    probList.splice(1,1,test[1].probability)
    probList.splice(2,1,test[2].probability)
};
// File upload and display
// $('#image_holder').show();
const inpFile = document.getElementById("inpFile");
const predButn = document.getElementById("predict");
const lnkButn = document.getElementById("getLink");

inpFile.addEventListener("change", function () {
    console.log("New image uploaded")
    const file = this.files[0];
    let src = URL.createObjectURL(file);
    let preview = document.getElementById("img");
    preview.src = src;
    preview.style.display = "block";
});

lnkButn.addEventListener("click", function(){
    console.log("Got link")
    const txtInpt = document.getElementById("txtInput").value
    console.log(txtInpt)
    let src = txtInpt
    let preview = document.getElementById("img")
    preview.src = src
    preview.style.display = "block"
});

async function getResult() {
    const result = await app().then(predictions => predictions[0].className)
    return predList.push(result)

};

document.onload = app();
document.onload = pred();



predButn.addEventListener("click", function () {
    //const res = await app();
    document.getElementById("rw1").innerHTML = ""
    document.getElementById("rw2").innerHTML = ""
    document.getElementById("rw3").innerHTML = ""
    var val = pred();
    setTimeout(function () {
        // rw1 c1 - c2
    var predTable = document.getElementById("rw1")
    var t1 = document.createElement("td")
    var content = document.createTextNode(predList[0])
    t1.appendChild(content)
    predTable.appendChild(t1)
        
    var t2 = document.createElement("td")
    var content2 = document.createTextNode(probList[0].toFixed(2))
    t2.appendChild(content2)
    predTable.appendChild(t2)        
        //rw2 c1 - c2
    var predTable2 = document.getElementById("rw2")
    var t3 = document.createElement("td")
    var content3 = document.createTextNode(predList[1])
    t3.appendChild(content3)
    predTable2.appendChild(t3)
    
    var t4 = document.createElement("td")
    var content4 = document.createTextNode(probList[1].toFixed(2))
    t4.appendChild(content4)
    predTable2.appendChild(t4)
        //rw3 c1 - c2
    var predTable3 = document.getElementById("rw3")
    var t5 = document.createElement("td")
    var content5 = document.createTextNode(predList[2])
    t5.appendChild(content5)
    predTable3.appendChild(t5)

    var t6 = document.createElement("td")
    var content6 = document.createTextNode(probList[2].toFixed(2))
    t6.appendChild(content6)    
    predTable3.appendChild(t6)

    // document.getElementById("p1").innerHTML = predList[0];
        console.log("Table is redy")
    }, 3000);
});

//app();