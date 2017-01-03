#define esp8266
#include "ht1632chain.h"
#include "font.h"
#define MEMCOL 64


#include <Arduino.h>

#include <ESP8266WiFi.h>

#include <ESP8266WiFiMulti.h>

#include <ESP8266WebServer.h>



ESP8266WiFiMulti wifiMulti;

ESP8266WebServer server(80);

uint16_t fx2[64];
uint16_t fx1[64];
uint16_t green[64];

#define USE_SERIAL Serial

HT1632CHAIN display;
void shiftMem(uint16_t mem[], bool left);
int  copytext(char msg[], uint16_t mem[], int x, int y, int offset);
void clearMem(uint16_t mem[]);
void parseText();

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  WiFi.disconnect();
  WiFi.hostname("LED_MATRIX");
  wifiMulti.addAP("SSID", "PSK");


  USE_SERIAL.println();
  USE_SERIAL.println();
  delay(20);
  display.begin(2, 13, 12, 14, 16);

  Serial.println("SETUP OK");
  for (int i = 0; i < 64; i++) {
    fx2[i] = (0x0f0f << i % 8) & 0x0ff0;
  }

  while (wifiMulti.run() != WL_CONNECTED) {          // DO until connected
    delay(100);
    USE_SERIAL.printf("[SETUP] WAIT ...\n");
    shiftMem(fx2, true);
    display.renderMemory(fx2, fx2);
  }

  char result[16];
  sprintf(result, "%d.%d.%d.%d", WiFi.localIP()[0], WiFi.localIP()[1], WiFi.localIP()[2], WiFi.localIP()[3]);
  clearMem(fx2);
  copytext(result,fx2,0,7,0);
  display.renderMemory(fx2, fx2);

  server.on("/", []() {
  server.send(200, "text/plain", "ESP-LED-MATRIX");
});

server.on("/matrix/text",parseText);


server.onNotFound([]() {
  server.send(200, "text/plain", "NOPE");
});
server.begin();
delay(2500);
}

void cpImg(const byte * img, uint16_t mem[], int w, int x, int y) {
  y = y % 16;
  if (x + w < MEMCOL) {
    for (int i = 0; i < w; i++) {
      uint8_t stripe = pgm_read_byte(&img[i]);
      mem[x + i] = ((mem[x + i] & ~(0x00ff << y))) | (stripe << y);
    }
  }
}

void shiftMem(uint16_t mem[], bool left) {
  uint16_t tmp;
  tmp = mem[0];
  for (int i = 0; i < 63; i++) {
    mem[i] = mem[i + 1];
  }
  mem[63] = tmp;
}

void clearMem(uint16_t mem[]) {
  for (int i = 0; i < 64; i++) {
    mem[i] =0;
  }
}

void fillMem(uint16_t mem[]) {
  for (int i = 0; i < 64; i++) {
    mem[i] =0xffff;
  }
}

uint8_t charEnd(const int * img, uint8_t c) {
  uint8_t cid = c - ' ';
  return pgm_read_byte(&img[cid]);
}

uint8_t charBegin(const int * img, uint8_t c) {
  uint8_t cid = c - ' ';
  if (cid < 1) {
    return 0;
  }
  return pgm_read_byte(&img[cid - 1]);
}

int copytext(char msg[], uint16_t mem[], int x, int y, int offset) {
  Serial.print("WRITETEXT: ");
  Serial.println(msg);
  int ccount = offset;
  uint8_t c, cid, cLast, cFirst, cLen;
  while (x < 64 && msg[ccount] != 0) {
    c = msg[ccount];
    if (c > 0x7f) {
      c = 0x20;
    }
    if (c >= 0x60) {
      c -= 0x20;
    }
    cid = c - ' ';
    cLast = charEnd(FONT_5X4_END, c);
    cFirst = charBegin(FONT_5X4_END, c);
    cLen = cLast - cFirst;

    for (uint8_t i = 0; i < cLen; i++)
    {
      uint8_t stripe = pgm_read_byte(&FONT_5X4[i + cFirst]);
      if (x + cLen < 64) {
        mem[x + i] = ((mem[x + i] & ~(0b11111100 << y))) | (stripe << y);
      }
      else if (x + i < 64) {
        mem[x + i] = ((mem[x + i] & ~(0b11111100 << y)));
      }
    }

    x += cLen;
    if(x >= 64 ){
      return ccount;
    }
    mem[x] = ((mem[x] & ~(0x00ff << y)));
    x++;
    ccount++;
  }
  return -1;
}

void parseText(){
  String buf;
  int rest=-1;
  char textBuf[64];
  if (server.hasArg("t0")) {
    buf = server.arg("t0");
    buf.toCharArray(textBuf,64);
    clearMem(fx1);
    rest=copytext(textBuf, fx1, 0, 7, 0);
    if(rest >= 0){
      copytext(textBuf, fx1, 0, 0, rest);
    }
  }
  server.send(200, "text/plain", "TextAnzeigen... "+buf);
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(50);
  //shiftMem(green, true);
  display.renderMemory(green, fx1);
  server.handleClient();
}
