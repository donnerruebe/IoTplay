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

SoftwareSerial swSer(14, 12, false, 256);

ESP8266WebServer server(80);

#define SERVO 15

#define USE_SERIAL Serial

void handleFlag();
void printMessage();

int flagTO=0;

ESP8266WiFiMulti wifiMulti;

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards


void setup() {
  WiFi.persistent(false);
  WiFi.disconnect();
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
  delay(1000);
  myservo.write(30);
}

void printMessage() {
  flagTO = 20;
  server.send(200, "text/plain", "OK");
}

int pos=0;

void handleFlag() {
  if (flagTO > 0) {
    for (int i = 0; i < 2; i++) {
      for (pos = 30; pos <= 120; pos += 2) // goes from 0 degrees to 180 degrees
      { // in steps of 1 degree
        myservo.write(pos);              // tell servo to go to position in variable 'pos'
        delay(6);                       // waits 15ms for the servo to reach the position
      }

    }
    flagTO--;
  }else{
  myservo.write(90);
  }
}

void loop() {

  server.handleClient();
  //handleFlag();
  delay(100);
  
  USE_SERIAL.println("LOOP");
  myservo.write(90);
  delay(500);
  myservo.write(30);
  delay(1500);

}

