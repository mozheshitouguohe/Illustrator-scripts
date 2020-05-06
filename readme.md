# Illustrator scripts

A collection of scripts to automate tasks in Adobe Illustrator

## Add layers

Creates new layers according the the order and names specified in the script.

```
var newLayers = ["Frame", "Illustration", "Insets", "Annotations"];
```

## Line weight validation

Checks if the line weights used in a document match the ones specified in the script.
Each layer has its own defined line weights.

```
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
```
