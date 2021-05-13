// #include "every cpp you need, NOT the h .cpp"
#include <node.h>
#include <string>
 //just put in all these usings, they're for node to use.
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

    void Method(const FunctionCallbackInfo<Value>&args) /*needs to have exactly that as the argument*/ { 
        Isolate* isolate = args.GetIsolate(); // just do if you need isolate somewhere like NewFromUTF8, see below

        int i;
        double x= 123.478;
        double y = 4.50;

        for (i=0; i<10000000; i++){
            x+=y;
        }


        auto total = Number::New(isolate, x);
        args.GetReturnValue().Set(total);

    }


    // Initialize write exactly as is, NODE_SET_METHOD have the 2nd arg be the name you want to use in JS and the 3rd arg is the function here
    void Initialize(Local<Object> exports) {
        NODE_SET_METHOD(exports, "calc", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize); // this needs to be at the end, don't touch


 }
