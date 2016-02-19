// This #include statement was automatically added by the Particle IDE.
#include "application.h"
#include "IRremote.h"

//Trigger pulldown
int led1 = D7;
int trigger = D3;
int triggerCurrent = 0;
int blasterTrack = 1;

//IR LED Setup
IRsend irsend(D5);
unsigned int S_pwr[68]={4600,4350,700,1550,650,1550,650,1600,650,450,650,450,650,450,650,450,700,400,700,1550,650,1550,650,1600,650,450,650,450,650,450,700,450,650,450,650,450,650,1550,700,450,650,450,650,450,650,450,650,450,700,400,650,1600,650,450,650,1550,650,1600,650,1550,650,1550,700,1550,650,1550,650};

int pwrCommand(String args) {
    int value = HIGH;

    if(args.equalsIgnoreCase("HIGH")){
        value = HIGH;
        Serial1.print("t");
        Serial1.write(3);
    }
    else if(args.equalsIgnoreCase("LOW")){
        value = LOW;
        Serial1.print("t");
        Serial1.write(4);
    }
    else {
        return -3;
    }

    digitalWrite(led1,value);
    return 1;
}

int strengthCommand(String args) {
    int value = HIGH;

    if(args.equalsIgnoreCase("S1")){
        Serial1.print("t");
        Serial1.write(7);
        blasterTrack = 2;
    }
    else if(args.equalsIgnoreCase("S2")){
        Serial1.print("t");
        Serial1.write(5);
        blasterTrack = 1;
    }
    else {
        return -3;
    }
    return 1;
}

int motvCommand(String args) {
    int value = HIGH;

    if(args.equalsIgnoreCase("M1")){
        Serial1.print("t");
        Serial1.write(6);
    }
    else if(args.equalsIgnoreCase("M2")){
        Serial1.print("t");
        Serial1.write(8);
    }
    else {
        return -3;
    }
    return 1;
}

int fthCommand(String args) {
    if(args.equalsIgnoreCase("X1")){
        Serial1.print("t");
        Serial1.write(9);
    }
    else {
        return -3;
    }
    return 1;
}




void setup() {
    //Serial1 Setup
    Serial1.begin(9600);

    //Setup listener
    Spark.function("pwrState",pwrCommand);
    Spark.function("strState",strengthCommand);
    Spark.function("motvStat",motvCommand);
    Spark.function("fthStat",fthCommand);
  //  Spark.function("strength", strengthSetting);
//    Spark.function("motivation",motivSetting);

    //Trigger pulldown
    pinMode(trigger, INPUT_PULLDOWN);

    //Debug
    pinMode(led1, OUTPUT);
    digitalWrite(led1, LOW);


}

void loop(){
    //Read the pull down input of the trigger button
    triggerCurrent = digitalRead(trigger);

    //Pulling trigger: Play track 1 on SD-Card 001TRACK.mp3
    if(triggerCurrent == HIGH) {
            Serial1.print("t");
            Serial1.write(blasterTrack);
            irsend.sendRaw(S_pwr,68,38);
            delay(1000);
    }

}
