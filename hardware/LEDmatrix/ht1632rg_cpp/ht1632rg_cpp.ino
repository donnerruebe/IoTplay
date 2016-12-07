#include "ht1632rg.h"

int mem[2][64];

void setup()
{
   ht1632rg_init();
   Serial.begin(9600);
   Serial.println("ON");
}




void up_led()
{
  for (byte n=0;n<4;n++)
  {
    ht1632rg_startData((n&1)+2*(n&2),0);
    
    for (byte i=0;i<16 ;i++)
    {
      ht1632rg_sendData(mem[0][i+n*16]>>8);
    }
    for (byte i=0;i<16 ;i++)
    {
      ht1632rg_sendData(mem[1][i+n*16]>>8);
    }
    
    ht1632rg_startData((n&1)+2*(n&2)+2,0);
    for (byte i=0;i<16 ;i++)
    {
      ht1632rg_sendData(mem[0][i+n*16]&0xff);
    }
    for (byte i=0;i<16 ;i++)
    {
      ht1632rg_sendData(mem[1][i+n*16]&0xff);
    } 
        
  }
 
}


void setdot(int x,int y,int color)
{
  if(x<64 && y <16 && y>=0 && x>=0)
  {
  if (color&1)
  {
    mem[0][x]|=(1<<(y));
  }
    else
  {
    mem[0][x]&=~(1<<(y));
  }
  
    if (color&2)
  {
    mem[1][x]|=(1<<(y));
  }
    else
  {
    mem[1][x]&=~(1<<(y));
  }
  }
}

void line(int x_pos,int y_pos,int dx, int dy,int color)
{}


void circle(int x_pos,int y_pos,int radius,int color)
{
int d = -radius;
int x = radius;
int y = 0;
while( y <= x)
{
    setdot (x_pos+x, y_pos+y,color);
    setdot (x_pos-x, y_pos+y,color);
    setdot (x_pos+x, y_pos-y,color);
    setdot (x_pos-x, y_pos-y,color);
    setdot (x_pos+y, y_pos+x,color);
    setdot (x_pos-y, y_pos+x,color);
    setdot (x_pos+y, y_pos-x,color);
    setdot (x_pos-y, y_pos-x,color);
    d = d + 2*y + 1;
    y = y + 1;
    if (d > 0)
    {
        d = d - 2*x + 2;
        x = x - 1;
    }
}
}


void whipe()
{
for(int i=0;i<64;i++)
{
    mem[0][i]=0;
    mem[1][i]=0;
    if(~i&1)up_led();
}
}

void cls_led()
{
for(int i=0;i<64;i++)
{
    mem[0][i]=0;
    mem[1][i]=0;
}
}

void parse()
{
  int i=0,x=0,c=0;
  byte rec;
  cls_led();
while (i<=2000)
{
  if(Serial.available()>0)
  {
    i=0;
    rec=Serial.read();
    mem[c][x>>1]|=rec<<(((x&1))*8);
    x++;
    if(x==128)
    {
      if(c==1)
      {break;}
      x=0;
      c=1;
    }
    
  }
delayMicroseconds(1);
i++;
}
}


int parse_pwm(int pwm)
{
  int i=0;
  while (i<=2000)
  {
  if(Serial.available()>0)
    {
      byte rec=Serial.read();
      return(int)rec;
      Serial.flush();
      break;
      
    }
  i++;
  }
  return pwm%16;
}


void loop()
{
  int x=0,a,pwm=1;
  int stat=0;
       mem[0][4]=0x06<<6;
      for(int i=5;i<60;i++)
      {
        mem[0][i]=0x0f<<6;
        mem[1][i]=0x06<<6;
        if(i%4==0)up_led(); 
        delay(1);
      }
      mem[0][60]=0x06<<6;
      up_led();
        delay(2000);
      cls_led();
      Serial.println("READY!");
  while (1)
  {   
    if(Serial.available() > 0)
    {
      a=Serial.read();
      if(a=='f')
      {
       parse();
        for(char i=pwm;i>=0;i--)
        {
          ht1632rg_setPWM(i);
          delay(100);
        }
          ht1632rg_sendCommand(-1, HT1632_CMD_LEDOFF);
       up_led();
        ht1632rg_sendCommand(-1, HT1632_CMD_LEDON);
        for(char i=0;i<=pwm;i++)
        {
          ht1632rg_setPWM(i);
          delay(100);
        }
         Serial.println("R");
      } 

      if(a=='t')
      {
       parse();
       up_led();
      }
      
      if(a=='p')
      {
         pwm=parse_pwm(pwm);
         ht1632rg_setPWM(last_pwm);
      }
    }
  }
}
