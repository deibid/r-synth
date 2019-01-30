




function playNoteOnSynths(note,velocity){
    
    mSynth1.triggerAttack(note,'+0.00',velocity);
    mSynth2.triggerAttack(note,'+0.00',velocity);

}



function stopNoteOnSynths(note){

    mSynth1.triggerRelease(note);
    mSynth2.triggerRelease(note);

}