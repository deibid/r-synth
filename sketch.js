
let mNoteToKeyMap = {};



var mPolySynth = new Tone.PolySynth(10,Tone.MonoSynth);

function setup(){
    
    mNoteToKeyMap.a = "C4";
    mNoteToKeyMap.w = "C#4";
    mNoteToKeyMap.s = "D4";
    mNoteToKeyMap.e = "D#4";
    mNoteToKeyMap.d = "E4";
    mNoteToKeyMap.f = "F4";
    mNoteToKeyMap.t = "F#4";
    mNoteToKeyMap.g = "G4";
    mNoteToKeyMap.y = "G#4";
    mNoteToKeyMap.h = "A4";
    mNoteToKeyMap.u = "A#4";
    mNoteToKeyMap.j = "B4";
    mNoteToKeyMap.k = "C5";
  
    let synthSettings = mPolySynth.get();
    synthSettings.oscillator.type = "sine";
    mPolySynth.set(synthSettings);
    mPolySynth.toMaster();
    // mPolySynth.connect(new Tone.FeedbackDelay("8n",0.5).toMaster());

    console.log("Synth settings: "+JSON.stringify(synthSettings,null,null));
}














function keyPressed(){

    let note = mNoteToKeyMap[key];
    mPolySynth.triggerAttack(note);
    
}


function keyReleased(){

    let note = mNoteToKeyMap[key];
    mPolySynth.triggerRelease(note);
    
}