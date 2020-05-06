// Specify which layers should be checked/validated.
// AND which line weights are approved for each layer. 
// All other line weights will be considered invalid and highlighted.

var myLayers = [
               layer1 = 
                  {
                     name: "Annotations",
                     weights: [0.25, 0.5, 3]
                  },
               layer2 = 
                  {
                     name: "Illustration",
                     weights: [0.25, 0.5, 6]
                  },
               ];

// Red color for highlighting non valid strokes.
// Change the values for other higlighting color.
var newRGBColor = new RGBColor();
newRGBColor.red = 255;
newRGBColor.green = 0;
newRGBColor.blue = 0;

// The script uses the currently active document.
var myDocument = app.activeDocument;

// Check if value exists in array

function myIndexOf(array, x) {
	var present = false;
	for(var i=0;i<array.length;i++) {
		if(array[i] == x) {
			present = true;
		}
	}
	return present;
}

// Specifically for layer names
function indexOfLayers(array, x) {
	var present = false;
	for(var i=0;i<array.length;i++) {
		if(array[i]["name"] == x) {
			present = true;
		}
	}
	return present;
}

// Specifically for layer line weights
function indexOfLineWeights(array, x) {
	var present = false;
	for(var i=0;i<array.length;i++) {
		if(myIndexOf(array[i]["weights"], x)) {
			present = true;
		}
	}
	return present;
}

// Validation function
function validateLineWeight() {
   
   // No validation layer has yet been created.
	var layerCreated = false;
   
   // Iterate through all Path items in the document.
	for(var i = 0; i < myDocument.pathItems.length; i++) {
		
		pathRef = myDocument.pathItems[i];
      
      //Only stroked paths should be validated.
		if(pathRef.stroked == true) {
         // Only validate the specified layers.
         if(indexOfLayers(myLayers, pathRef.layer.name)) {						
                
            strokeIsValid = false;
				
				// If the line weight is one of the specified it is valid.
				if(indexOfLineWeights(myLayers, pathRef.strokeWidth)) {
					strokeIsValid = true;
				}
            
				// If it's not a valid line weight:
				if(strokeIsValid == false) {
					
					// Create a new layer if it hasn't already been created.
					if(layerCreated == false) {
						var newLayer = myDocument.layers.add();
						newLayer.name = "Validation result";
						layerCreated = true;
					}
					// Make a copy of the path and put it in the new layer.
               var newPathRef = pathRef.duplicate(myDocument.layers[0]);
               // Add color to the path with non valid line weight.
               newPathRef.strokeColor = newRGBColor;
               // Remove any fill. Otherwise the inset boxes will be filled.
               //newPathRef.filled = false;							
				}
			}
		}
				
	}
}

// Run the function.
validateLineWeight();

  