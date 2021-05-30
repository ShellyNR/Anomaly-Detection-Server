# Anomaly-Detection-Server


## Project Description
This is an server that allows to display flight anomaly data on the web page. 
The web presents to the pilot all of the anomaly from is flight's data.


## 📽️ Demonstration Video


##  Architecture MVC
The `<Model-View-Controller>` (MVC) is an architectural pattern that separates an application into three main logical components: the `<model>`, the `<view>`, and the `<controller>`. Each of these components are built to handle specific development aspects of an application. (The explanation taken from tutorialspoint Web).
In our project the user choose the type of algorithm (linear or hybrid), in addition the user uploads to the server (by the  `<view>`) the two CSV files (train csv, test csv). 
The files and the flag (which indicates the type of algorithm) are then transferred to the `<controller>` which transfers the information from the CSV files to the json file.
The  `<controller>` saves the json files and passes their address to the  `<model>`.
The  `<model>` sends the information to the requested algorithm (which is coded in the CPP) and returns the result to the  `<controller>`.



##  Preliminary requirements

Make sure that all the libraries must be installed
- [x] this server should run on linux.
- [x] nodejs - `sudo apt install nodejs`
- [x] express library - `npm i express`
- [x] express-fileupload library - `npm I express-fileupload`
- [x] node-fetch library - `npm install -g node-gyp`
- [x] node-gyp library - `npm install -g node-gyp`

## How to build
first, in model directoy:
- [x] node-gyp configure - `Node-gyp configure`
- [x] node-gyp build - `Node-gyp build`

after that, in controller directory:
- [x] start server - `node expServer.js`

##  Operating instructions

- [x] Opening screen
![image](https://user-images.githubusercontent.com/73064092/119977317-f16cd680-bfc0-11eb-9983-eab9e743a589.png)

- [x] After selecting the model and uploading the required files, press the `<Submit Query>` button
 ![image](https://user-images.githubusercontent.com/73064092/119977442-1e20ee00-bfc1-11eb-86e8-70f08afec2ad.png)
- [x] The end result
![image](https://user-images.githubusercontent.com/73064092/119977495-30029100-bfc1-11eb-9257-12f2e6764f17.png)



## UML diagram
![image](https://user-images.githubusercontent.com/73064092/119975369-70144480-bfbe-11eb-9051-49005aa51db1.png)



