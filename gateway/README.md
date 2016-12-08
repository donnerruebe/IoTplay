# GateWay
Node-JS based IoT-Gateway for SummIT-Presentation

IMPORTANT: You need one of this players installed for commandline use: mplayer afplay mpg123 mpg321 play omxplayer aplay cmdmp3

The mp3 foo.mp3 isn't included yet.

API-CALLS: ( [METHOD] PATH/TO/FOOO ; (REQUEST) ; (RESULT) )

**im zweifelsfall gibts nur einen 200er Response oder die angeforderten Daten**

## Sensordaten einlesen
- [GET] /sensor/data;;[{time... info...}]        //Alle Messwerte

## LedCube
- [PUT] /ledCube/color;{r:int(0-255),g:int,b:int};{r:int(0-255),g:int,b:int} //setzt die Farbe für den Würfel
- [GET] /ledCube/color;;{r:int(0-255),g:int,b:int} //liest die Farbe für den Würfel
- [POST]/ledCube/switch;{state:"on"/"off"}

## MessageDisplay
- [PUT] /messageboard/text;{text:str};          //schreibt den Text auf's Display
- [DELETE] /messageboard/all;;                   //Löscht das Display

## SimpleMailbox
- [PUT] /mailbox/question/;{sender:str,subject:str,message:str};
- [PUT] /mailbox/mail/;{sender:str,subject:str,message:str};
- [GET] /mailbox/mails/;;[{sender:str, subject:str, message:str},...]
- [GET] /mailbox/flag/
- [PUT] /mailbox/flag/:[on/off];;

## AudioPlayer
- [GET] /player/liste;;["filename",...] //Liste der Dateien?
- [GET] /player/play;; //evtl. WiedergabeInfos
- [POST]/player/play;{track:"filename"};
- [POST]/player/pause
- [POST]/player/stop
