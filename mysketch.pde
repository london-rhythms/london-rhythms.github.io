int aLength = 400;

float [] anglesA = new float [aLength];
float [] anglesB = new float [aLength];
int t = 0;
int size = 900;
int startX = 1000/2;
int startY = 1000/2;
float radius = size/2;


void setup(){
  size(1000,1000);
  background(255);
  
  float a = 0;
  float b = 90;
  float bInt = 10.5;
  float aInt = 10;
  
  for (int i=0; i<aLength; i++){
    
    if (b>360){
      b = 0+((b-360));
    }
    if (a>360){
      a = 0+((a-360));
    }
    //chord(a,b);
    anglesA[i] = a;
    anglesB[i] = b;
    b = b+bInt;
    a = a+aInt;
  }
}

void draw(){
  frameRate(10);
  ellipseMode(CENTER);
  noFill();
  ellipse(startX,startY,size,size);
  
  if(t == (aLength-1)) t = 0;
  else t = t+1;
  
  chord(anglesA[t],anglesB[t]);
}

void chord(float a1, float a2){
  
  float angle1 = a1;
  float angle2 = a2;

  float xDif1 = sin(radians(angle1)) * radius;
  float yDif1 = - cos(radians(angle1)) * radius;
  float xDif2 = sin(radians(angle2)) * radius;
  float yDif2 = - cos(radians(angle2)) * radius;

  float x1 = startX+xDif1;
  float y1 = startY+yDif1;
  float x2 = startX+xDif2;
  float y2 = startY+yDif2;
  
  stroke(0);
  line(x1,y1,x2,y2);
}

void mousePressed(){
  saveFrame("line-######.png");
}