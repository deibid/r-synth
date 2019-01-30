function sendMidiEvent(note){
    ga('send', 'event', "PlayNote", "Midi", "PlayNote", note);
}

function sendMouseEvent(note){
    ga('send', 'event', "PlayNote", "Mouse", "PlayNote", note);
}

function sendKeyboardEvent(note){
    ga('send', 'event', "PlayNote", "Keyboard", "PlayNote", note);
}

function sendRandomizationEvent(){
    ga('send', 'event', "Randomize");
}