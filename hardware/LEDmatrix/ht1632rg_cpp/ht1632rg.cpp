#include <avr/pgmspace.h>
#include "ht1632rg.h"








void ht1632rg_select(int address)
{ 
  digitalWrite(HT1632_PIN+4,LOW);//CS_dat
  digitalWrite(HT1632_PIN+3,HIGH);//CS_CLK
  digitalWrite(HT1632_PIN+3,LOW);
  digitalWrite(HT1632_PIN+4,HIGH);
  digitalWrite(HT1632_PIN+3,HIGH);
  digitalWrite(HT1632_PIN+3,LOW);
  for(int i=HT1632_NUM-1; i>=0;i--)
  {
    
    if((address==i)||(address==-1)||(address==-2 && address&2)||(address==-3 && !(address&2)))
    {
      digitalWrite(HT1632_PIN+4,LOW);//select
    }
    else
    {
      digitalWrite(HT1632_PIN+4,HIGH);//Disselect
    }
    delay(1);
    digitalWrite(HT1632_PIN+3,HIGH);
    delay(1);
    digitalWrite(HT1632_PIN+3,LOW);
    
  }
}

void ht1632rg_transmit(int data, byte len)
{
    int pos=0;
    pos=(1<<len-1);
    digitalWrite(HT1632_PIN+2,LOW);
    while(pos)
    {
    digitalWrite(HT1632_PIN+2,LOW);
    if((data & pos) != 0)
    {
      digitalWrite(HT1632_PIN+1,HIGH);
    }
    else
    {
      digitalWrite(HT1632_PIN+1,LOW);
    }
    digitalWrite(HT1632_PIN+2,HIGH);
    pos=pos>>1;
    }
}


void ht1632rg_sendCommand(int ADR, int command)
{
    ht1632rg_select(ADR);
    ht1632rg_transmit(0b100,3);
    ht1632rg_transmit(command,8);
    ht1632rg_transmit(0b0,1);
}

void ht1632rg_init()
{
  for(int i=0; i<5;i++)
  {
    if(i==0)
    {
      pinMode(HT1632_PIN+i,INPUT);
    }
    else
    {
      pinMode(HT1632_PIN+i,OUTPUT);
    }
  }
  
  while(digitalRead(HT1632_PIN)==0)
  {
    digitalWrite(13,HIGH);
    delay(200);
    digitalWrite(13,LOW);
    delay(200);
  }
  delay(1000);
  for (int i=0; i<HT1632_NUM; i++) {
    ht1632rg_sendCommand(i, HT1632_CMD_COMS00); // 16*32, PMOS drivers
    ht1632rg_sendCommand(i, HT1632_CMD_MSTMD);  // MASTER MODE
    ht1632rg_sendCommand(i, HT1632_CMD_SYSON);  // System on
    ht1632rg_sendCommand(i, HT1632_CMD_LEDON);  // LEDs on
    ht1632rg_sendCommand(i, HT1632_CMD_BLINKOFF); 
  }
    ht1632rg_setPWM(1); 
  
  
}


void ht1632rg_startData(int Chip ,int Addr)
{
  ht1632rg_select(Chip);
  ht1632rg_transmit(0b101,3);
  ht1632rg_transmit(Addr,7);
}
void ht1632rg_sendData(byte data)
{
  ht1632rg_transmit((int)data,8);
}
void ht1632rg_setPWM(int value)
{
  ht1632rg_sendCommand(-1,0xa0 + (value & 0x0f));
}


