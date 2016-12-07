/*
  Morse.h - Library for flashing Morse code.
  Created by David A. Mellis, November 2, 2007.
  Released into the public domain.
*/
#ifndef HT1632_NUM
#define HT1632_NUM 0x08
#endif

#ifndef HT1632_PIN
#define HT1632_PIN 3
#endif

#ifndef HT1632_LIB
#define HT1632_LIB

#include "Arduino.h"






//Command Mode
#define HT1632_CMD_SYSDIS       0x00    //Turn off system oscillator and LED duty cycle generator
#define HT1632_CMD_SYSON        0x01    //Turn on system oscillator
#define HT1632_CMD_LEDOFF       0x02    //Turn off LED duty cycle generator
#define HT1632_CMD_LEDON        0x03    //Turn on LED duty cycle generator
#define HT1632_CMD_BLINKOFF     0x08    //Turn off blinking function
#define HT1632_CMD_BLINKON      0x09    //Turn on blinking function
#define HT1632_CMD_SLAVEMODE    0x10    //Set slave mode and clock source from external clock, the system clock input from OSC pin and synchronous signal input from SYN pin
#define HT1632_CMD_MSTMD        0x18    //Set master mode anc clock source from on-chip RC oscillator, the system clock output to OSC pin and synchronous signal output SYN pin
#define HT1632_CMD_EXTCLK       0x1C    //System clock source, external
#define HT1632_CMD_COMS00        0x20    //N-MOS open drain output and 8 COM option
#define HT1632_CMD_COM01        0x24    //N-MOS open drain output and 16 COM option
#define HT1632_CMD_COM10        0x28    //P-MOS open drain output and 8 COM option
#define HT1632_CMD_COM11        0x2C    //P-MOS open drain output and 16 COM option
 
//Command Mode - PWM Settings
#define HT1632_CMD_PWM01        0xA0    //PWM 1/16 Duty
#define HT1632_CMD_PWM02        0xA1    //PWM 2/16 Duty
#define HT1632_CMD_PWM03        0xA2    //PWM 3/16 Duty
#define HT1632_CMD_PWM04        0xA3    //PWM 4/16 Duty
#define HT1632_CMD_PWM05        0xA4    //PWM 5/16 Duty
#define HT1632_CMD_PWM06        0xA5    //PWM 6/16 Duty
#define HT1632_CMD_PWM07        0xA6    //PWM 7/16 Duty
#define HT1632_CMD_PWM08        0xA7    //PWM 8/16 Duty
#define HT1632_CMD_PWM09        0xA8    //PWM 9/16 Duty
#define HT1632_CMD_PWM10        0xA9    //PWM 10/16 Duty
#define HT1632_CMD_PWM11        0xAA    //PWM 11/16 Duty
#define HT1632_CMD_PWM12        0xAB    //PWM 12/16 Duty
#define HT1632_CMD_PWM13        0xAC    //PWM 13/16 Duty
#define HT1632_CMD_PWM14        0xAD    //PWM 14/16 Duty
#define HT1632_CMD_PWM15        0xAE    //PWM 15/16 Duty
#define HT1632_CMD_PWM16        0xAF    //PWM 16/16 Duty






void ht1632rg_select(int address);
void ht1632rg_transmit(int data, byte len);
void ht1632rg_sendCommand(int ADR, int command);
void ht1632rg_init();
void ht1632rg_startData(int Chip ,int Addr=0);
void ht1632rg_sendData(byte data);
void ht1632rg_setPWM(int value);


#endif



