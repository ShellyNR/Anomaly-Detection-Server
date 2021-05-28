{
    "libraries": [
      "node.h"
      "string"
      "anomaly_detection_util.h"
      "minCircle.h"
      "timeseries.h"
      "AnomalyDetector.h"
      "SimpleAnomalyDetector.h"
      "HybridAnomalyDetector.h"
      "iostream"
      "string.h"
      "fstream"
      "sstream"
      "map"
      "vector"
      "string.h"
      "algorithm"
      "math.h"
      "stdlib.h"
      "time.h"
      "sstream"
      "bits/stdc++.h"
    ],
  "targets": [
    {
      "target_name": "model",
      "sources": [ 
        "./model.cpp", 
        "./anomaly_detection_util.cpp",
        "./SimpleAnomalyDetector.cpp",
        "./HybridAnomalyDetector.cpp",
        "./minCircle.cpp",
        "./timeseries.cpp"
        ] #file location
    }
  ]
}