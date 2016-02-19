/*
 * IRremote: IRrecvieve- Receives IR codes with IRrecv and supports hex code for Samsung TV
 */

#include <IRremote.h>
#include <Servo.h>

int RECV_PIN = 11;
int LED_PIN = 7;
int pos = 0;

//IR interface setup
IRrecv irrecv(RECV_PIN);
decode_results results;

//Servo interface setup
Servo servo1;

void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn(); // Start the receiver
  pinMode(LED_PIN, OUTPUT); //Set LED as output
//  servo1.attach(14); //analog pin 0
}

void loop() {
  static int v = 0;
  if (irrecv.decode(&results)) {
    if(results.value == 0xE0E040BF) {
      Serial.println("It's a Hit");
      digitalWrite(LED_PIN, HIGH);

      for (pos = 0; pos <= 45; pos += 2) { // goes from 0 degrees to 180 degrees
      // in steps of 1 degree
      servo1.attach(14);
      servo1.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
      }
      servo1.detach();
      delay(2000);
      digitalWrite(LED_PIN, LOW);
      
     for (pos = 165; pos >= 120; pos -= 2) { // goes from 180 degrees to 0 degrees
      servo1.attach(14);
      servo1.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
      }
      servo1.detach();
  //    digitalWrite(LED_PIN, LOW);
    }
    irrecv.resume(); // Receive the next value
  }
}
