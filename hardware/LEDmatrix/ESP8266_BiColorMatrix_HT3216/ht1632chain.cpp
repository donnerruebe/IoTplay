#include "ht1632chain.h"

void HT1632CHAIN::begin(uint8_t NUM, uint8_t CS, uint8_t WR, uint8_t DAT, uint8_t CLK) {
  _panel    = NUM;
  _ic_count = _panel * 4;
  _pinCS    = CS;
  _pinWR    = WR;
  _pinDATA  = DAT;
  _pinCLK   = CLK;
  init();
}

void HT1632CHAIN::pulseCLK() {
  digitalWrite(_pinCLK, HIGH);
  NOP();
  digitalWrite(_pinCLK, LOW);
  NOP();
}

void HT1632CHAIN::pulseWR() {
  // Set the DATA pin to the correct state
  digitalWrite(_pinDATA, LOW);
  NOP(); // Delay
  // Raise the WR momentarily to allow the device to capture the data
  digitalWrite(_pinWR, HIGH);
  NOP(); // Delay
  // Lower it again, in preparation for the next cycle.
  digitalWrite(_pinWR, LOW);
}

void HT1632CHAIN::sendData(byte data, uint8_t len) {
  int mask = (1 << (len-1));
  for (int i = 0; i < len; i++) {
    digitalWrite(_pinWR, LOW);
    NOP();
    digitalWrite(_pinDATA, (data & mask) == 0 ? LOW : HIGH);      
    NOP();
    digitalWrite(_pinWR, HIGH);
    NOP();
    mask = mask >> 1;
  }
  digitalWrite(_pinWR, LOW);
}

void HT1632CHAIN::setMode(byte mode) {
  sendData(mode, HT1632_ID_LEN);
}

void HT1632CHAIN::setBrightness(byte value) {
  selectAll();
  setMode(HT1632_ID_CMD);
  writeCommand(0xA0+(value&0x0f)); // PWM 16/16 duty
  selectNon();
}

void HT1632CHAIN::select(uint8_t chip) {
  for (uint8_t i = _ic_count ; i > 0; i--) {
      digitalWrite(_pinCS, (chip == i-1) ? LOW : HIGH);
      pulseCLK();
  }
}

void HT1632CHAIN::selectAll() {
  for (uint8_t i = 0 ; i < _ic_count; ++i) {
      digitalWrite(_pinCS, LOW);
      pulseCLK();
  }
}


void HT1632CHAIN::selectNon() {
  for (uint8_t i = 0 ; i < _ic_count; ++i) {
      digitalWrite(_pinCS, HIGH);
      pulseCLK();
  }
}

void HT1632CHAIN::writeCommand(uint8_t cmd) {
  sendData(cmd, HT1632_CMD_LEN);
  pulseWR();
}

void HT1632CHAIN::renderMemory(uint16_t memG[], uint16_t memR[]) {
  byte pixel=0x00;

  for (int chip = 0; chip < _ic_count; chip++) {
    int addr = (chip >> 2) * 32 + (chip & 1) * 16;
    
    select(chip);
    sendData(HT1632_ID_WR, HT1632_ID_LEN);
    sendData(0, HT1632_ADDR_LEN); // Selecting the memory address

    for (int col = 0; col < 16; col++) { //GREEN
      
      if (chip & 2) {
        pixel = memG[addr + col] & 0xff;
      } else {        
        pixel = memG[addr + col] >> 8;
      }
      sendData(pixel, 8);
    }
    for (int col = 0; col < 16; col++) { //RED
      
      if (chip & 2) {
        pixel = memR[addr + col] & 0xff;
      } else {        
        pixel = memR[addr + col] >> 8;
      }
      sendData(pixel, 8);
    }
  }
  
    selectNon();
}


void HT1632CHAIN::init() {

  pinMode(_pinWR, OUTPUT);
  pinMode(_pinDATA, OUTPUT);
  pinMode(_pinCS, OUTPUT);
  pinMode(_pinCLK, OUTPUT);

  digitalWrite(_pinWR, LOW);
  digitalWrite(_pinDATA, LOW);
  digitalWrite(_pinCS, HIGH);
  digitalWrite(_pinCLK, LOW);

  selectAll();
  setMode(HT1632_ID_CMD);
  writeCommand(HT1632_CMD_SYSDIS); // Turn off system oscillator
  writeCommand(HT1632_CMD_COMS00);
  writeCommand(HT1632_CMD_RCCLK);  // Master Mode, external clock
  writeCommand(HT1632_CMD_SYSEN); //Turn on system
  writeCommand(HT1632_CMD_LEDON); // Turn on LED duty cycle generator
  
  writeCommand(HT1632_CMD_PWM(16)); // PWM 16/16 duty
  selectNon();
}



