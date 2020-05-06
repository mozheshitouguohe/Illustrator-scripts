// Script applies to the active document.
var myDocument = app.activeDocument;

// Define the layer names and order here.
var newLayers = ["Frame", "Illustration", "Insets", "Annotations"];

// The script iterates through the layers specified above and creates them. Don't touch this code.
for (i=0;i<newLayers.length;i++) {
   var newLayer = myDocument.layers.add();
   newLayer.name = newLayers[i];
}
