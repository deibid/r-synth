let mVibrato;

//for vibratos
let mActiveNotes =[];


function enableMidi(){
    WebMidi.enable(function(err){
      
        if(err){
          console.log("Error setting MIDI ", err);
          return;
        }
  
        // console.log("Inputs: " + WebMidi.inputs);
        // console.log("Outputs: " + WebMidi.outputs);
        
        
  
        if(WebMidi.inputs.length === 0) return;
        mMidiKeyboard = WebMidi.inputs[0];
  
        
  
        mVibrato = new Tone.Vibrato(8,0).toMaster();
        // connectVibratoToAllVoices();
  
  
        mMidiKeyboard.addListener('noteon','all',function(e){
          
          
        

          let note = getNoteFromMIDIMessage(e);
          let velocity = getVelocityFromMIDIMessage(e);
  

          sendMidiEvent(note);


          playNoteOnSynths(note,velocity);
          setUIKeyToActive(note);
        //   connectVibratoToSynthVoice(note);
        
        });
  
        mMidiKeyboard.addListener('noteoff','all',function(e){
          
            // disconectVibratoFromAllVoices();
            // console.log("Recibi noteoff. Evento: "+JSON.stringify(e,null,null));
            let note = getNoteFromMIDIMessage(e);
          
            stopNoteOnSynths(note);
            setUIKeyToInactive(note);
            // disconnectVibratoFromSynthVoice(note);
    

        });
  
  
        // mMidiKeyboard.addListener('controlchange','all',function(e){
          
        //   switch(e.controller.name){
        //     case "modulationwheelcoarse":
  
        //     let depth = map(e.value,0,127,0,1);
        //     mVibrato.depth.value = depth;
        //     break;
        //   }
          
        // //   console.log("Control change: "+JSON.stringify(e,null,null));
        // });
  
      });
}


function connectVibratoToSynthVoice(note){

    mActiveNotes.push(note);
    mSynth1.voices[mActiveNotes.indexOf(note)].connect(mVibrato);
    mSynth2.voices[mActiveNotes.indexOf(note)].connect(mVibrato);

}

function disconnectVibratoFromSynthVoice(note){
    
    mSynth1.voices[mActiveNotes.indexOf(note)].connect(mVibrato);
    mSynth2.voices[mActiveNotes.indexOf(note)].connect(mVibrato);
    mActiveNotes =  mActiveNotes.filter(noteInArray => note !== noteInArray);

}


function getNoteFromMIDIMessage(e){
    return e.note.name+e.note.octave;
}

function getVelocityFromMIDIMessage(e){
    return e.velocity;
}