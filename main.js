choice1=""
choice2=""

Webcam.set({
    width:300,
    height:350,
    image_format:"png",
    png_quality:90
})
camera=document.getElementById("camera")

Webcam.attach(camera)
 
function takepic(){
    Webcam.snap(function(data_uri){
    document.getElementById("output").innerHTML = "<img id='taken_image' src="+data_uri+">"
    })
}
console.log("ml5version",ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-7uDWO3_M/model.json",ml5thing)
function ml5thing(){
    console.log("modelloaded")
}
function speak(){
    var synth = window.speechSynthesis
    phrase1= "we think you are"+choice1
    phrase2= "if you weren't"+choice1+", you might be"+choice2
    var utterthis= new SpeechSynthesisUtterance(phrase1+phrase2)
    synth.speak(utterthis)
}
function identify(){
    image=document.getElementById("taken_image")
    classifier.classify(image,gotResult)
}
function gotResult(error,results){
if(error){
    console.error(error)
}else {
    console.log(results)
    document.getElementById("result_emotion_name").innerHTML = results[0].label
    document.getElementById("result_emotion_name2").innerHTML = results[1].label
    choice1=results[0].label
    choice2=results[1].label
    speak()
    if(results[0].label == "happy"){
    document.getElementById("result_emoji").innerHTML = "&#128522;"
    }
    if(results[0].label == "sad"){
    document.getElementById("result_emoji").innerHTML = "&#128546;"
    }
    if(results[0].label == "mad"){
    document.getElementById("result_emoji").innerHTML = "&#128548;"
    }
    if(results[1].label == "happy"){
    document.getElementById("result_emoji2").innerHTML = "&#128522;"
    }
    if(results[1].label == "sad"){
    document.getElementById("result_emoji2").innerHTML = "&#128546;"
    }
    if(results[1].label == "mad"){
    document.getElementById("result_emoji2").innerHTML = "&#128548;"
    }
}
}