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
    using namespace std; //for the strings

    void Method(const FunctionCallbackInfo<Value>&args) /*needs to have exactly that as the argument*/ { 
        Isolate* isolate = args.GetIsolate(); // just do if you need isolate somewhere like NewFromUTF8, see below

        // All v8 objects are accessed using locals, they are necessary because of the way the v8 garbage collector works
        Local<Context> context = isolate->GetCurrentContext();

        Local<Object> obj = Object::New(isolate);

        // passing integers from the controller to the model

        int someInt = (int)args[2].As<Number>()->Value();

        if (someInt == 1) {

            // passing string from the controller to the model
            // ToLocalChecked() is simply going to convert the result into v8's Local

            Local<String> arg0 = args[0]->ToString(context).ToLocalChecked();

            // passing string from the model to the controller using an object

            obj->Set(context, String::NewFromUtf8(isolate,"msg").ToLocalChecked(),
                               arg0).FromJust();


        }

        if (someInt == 2) {

            obj->Set(context, String::NewFromUtf8(isolate,"msg").ToLocalChecked(),
                               args[1]->ToString(context).ToLocalChecked()).FromJust();


        }

        

        args.GetReturnValue().Set(obj);


        //auto total = Number::New(isolate, someInt);        

        //args.GetReturnValue().Set(total);

    }


    // Initialize write exactly as is, NODE_SET_METHOD have the 2nd arg be the name you want to use in JS and the 3rd arg is the function here
    void Initialize(Local<Object> exports) {
        NODE_SET_METHOD(exports, "calc", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize); // this needs to be at the end, don't touch


 }
