#include <node.h>
#include <string>
#include "anomaly_detection_util.h"
#include "minCircle.h"
#include "timeseries.h"
#include "AnomalyDetector.h"
#include "SimpleAnomalyDetector.h"
#include "HybridAnomalyDetector.h"

namespace model {
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::Persistent;
    using v8::String;
    using v8::Value;
    using v8::Array;
    using v8::Exception;
    using namespace std;

    void vecToJson(std::vector<AnomalyReport> aR) {
	string jsonString;
	string key, val;
	int vecSize = aR.size();
	for(int i=0; i < vecSize; i++) {
		key = aR[i].description;
		val = to_string(aR[i].timeStep);
		if (i != vecSize - 1)
			jsonString += "{\"" +key + "\"" + ": " + "\"" + val + "\"" + "},";
		else
			jsonString += "{\"" +key + "\"" + ": " + "\"" + val + "\"}";
	}
	ofstream myfile;
	myfile.open ("../files/example.json");
	myfile << jsonString;
	myfile.close();
    }

    void Method(const FunctionCallbackInfo<Value>&args) { 
        Isolate* isolate = args.GetIsolate(); 

        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> obj = Object::New(isolate);
        //------------------------------------------------------------//
        // passing integer from controller to model
        int simpleHybridFlag = (int)args[0].As<Number>()->Value();
        //------------------------------------------------------------//
        TimeSeries trainTS("../files/train.csv");
        TimeSeries testTS("../files/test.csv");
        //----------------------------------------------------------------------------//
        // using SimpleAnomalyDetector        
        if (simpleHybridFlag == 1) {
            SimpleAnomalyDetector ad;
	        ad.learnNormal(trainTS);
            vector<correlatedFeatures> cf=ad.getNormalModel();            
            vector<AnomalyReport> aR = ad.detect(testTS);
            vecToJson(aR);
        }        
        // using HybridAnomalyDetector
        else if (simpleHybridFlag == 2) {            
	        HybridAnomalyDetector ad;
	        ad.learnNormal(trainTS);
            vector<correlatedFeatures> cf=ad.getNormalModel();            
            vector<AnomalyReport> aR = ad.detect(testTS);                                                
            vecToJson(aR);
        }
        //----------------------------------------------------------------------------//

        args.GetReturnValue().Set(obj);
    }

    void Initialize(Local<Object> exports) {
        NODE_SET_METHOD(exports, "detectAnomalies", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}
