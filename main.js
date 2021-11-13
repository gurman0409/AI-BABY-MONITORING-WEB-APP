status = "";
img = "";
objects = [];
song = "";

function preload()
{
  song = loadSound("song.mp3");
}

function setup()
{
  canvas = createCanvas(420,320);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(420,320);
  ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
  console.log("modelLoaded");
  status = true;
}

function gotResults(error, results)
{
  if (error){
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function draw(){
             
    image(video,0,0,420,320);
    
    random_number_r = random(255);
    random_number_g = random(255);
    random_number_b = random(255);

    if(status != "")
    {
      ObjectDetector.detect(video, gotResults);
      document.getElementById("status").innerHTML = "Status: Objects Detected";
      for (i = 0; i < objects.length; i++) {
      
      label = objects[i].label;
      if(label == 'person')
      {
        document.getElementById("baby").innerHTML = "Baby found";
        song.stop();
      } else {
        document.getElementById("baby").innerHTML = "baby not found";
        song.play();
      }
      x = objects[i].x;
      y = objects[i].y;
      confidence = objects[i].confidence;
      width = objects[i].width;
      height = objects[i].height;
      text(label,x,y);
      noFill()
      rect(x,y,width,height); 
      
      }
    }
}