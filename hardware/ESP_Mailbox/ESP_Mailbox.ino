/**
   BasicHTTPClient.ino

    Created on: 24.05.2015

*/

#include <Arduino.h>

#include <ESP8266WiFi.h>

#include <ESP8266WiFiMulti.h>

#include <ESP8266WebServer.h>

#include <Servo.h>

#include "SoftwareSerial.h" // FROM https://github.com/plerup/espsoftwareserial

#include "wificred.h" // wifiMulti.addAP("SSID", "PSK");

SoftwareSerial swSer(-1, 12);

ESP8266WebServer server(80);

#define SERVO 15

#define USE_SERIAL Serial

void handleFlag();
void printMessage();
void cutPaper();
void printMode(bool fat,bool big,bool line);
int flagTO = 0;

ESP8266WiFiMulti wifiMulti;

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards


void setup() {
  WiFi.persistent(false);
  WiFi.disconnect();
  WiFi.hostname("Mailbox");
  delay(200);
  // attaches the servo on GIO2 to the servo object
  USE_SERIAL.begin(115200);
  // USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println("SETUP");
  delay(200);

  FirstAP1
  FirstAP4

  USE_SERIAL.println();
  USE_SERIAL.println();

  byte x = 0;
  while (wifiMulti.run() != WL_CONNECTED) {          // DO until connected
    delay(500);
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", x);
    x++;
  }


  server.on("/", []() {
    server.send(200, "text/plain", "ESP-WWW-Printer");
  });

  server.on("/print", printMessage);


  server.onNotFound([]() {
    server.send(200, "text/plain", "NOPE");
  });

  server.begin();

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  myservo.attach(SERVO);

  swSer.begin(9600);
  printMode(false,true,true);
  String mName = server.arg("sender");
  swSer.println(mName);
  
  printMode(true,false,false);
  String mSubject = server.arg("subject");
  swSer.println(mSubject);
  
  printMode(false,false,false);
  String mMessage = server.arg("message");
  swSer.println(mMessage);
  
  cutPaper();
  swSer.println(WiFi.localIP());
  cutPaper();
  delay(1000);
  myservo.write(30);
}

void cutPaper() {
  swSer.write(0x1d);
  swSer.write(0x56);
  swSer.write(66);
  swSer.write(3);
  swSer.write('\n');
}

void printMode(bool fat,bool big,bool line) {
  swSer.write(0x1b);
  swSer.write(0x21);
  byte pMode = 0;
  pMode += fat?0x08:0;
  pMode += big?0x30:0;
  pMode += line?0x80:0;
}

void printMessage() {
  flagTO = 20;
  printMode(false,true,true);
  String mName = server.arg("sender");
  swSer.println(mName);
  
  printMode(true,false,false);
  String mSubject = server.arg("subject");
  swSer.println(mSubject);
  
  printMode(false,false,false);
  String mMessage = server.arg("message");
  swSer.println(mMessage);
  
  cutPaper();
  server.send(200, "text/plain", "OK");
}

int pos = 0;

void handleFlag() {
  if (flagTO > 0) {
    myservo.write(130);
    delay(100);
    flagTO--;
  } else {
    myservo.write(40);
  }
}

void loop() {

  server.handleClient();
  handleFlag();
  delay(100);

}

