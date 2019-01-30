let mSynth1 = new Tone.PolySynth(10,Tone.MonoSynth).toMaster();
let mSynth2 = new Tone.PolySynth(10,Tone.MonoSynth).toMaster();

//  Awesome inspiration from this app: https://dotpiano.com/
let mColors = ["#4356B5","#7962BA","#9841A3","#C0326B","#E4533C","#F29246","#F5BD46","#CEBE3D","#8EBA3B","#4FB155","#4BB4A1","#4998B4"];
let mDefaultColor = "#2E2C2E";
let mInitialColor = 0;


let mMidiKeyboard;




function setup(){

  noCanvas();
  assignSynthParameters();


  $("#randomize-button").click(function(){
    sendRandomizationEvent();
    assignSynthParameters();
  });

  loadTutorialAnimation();


  assignClickListenersToSynthParamButtons();
  createUIKeyboard();
  enableMidi();
        
}

function loadTutorialAnimation(){
  $("#tutorial-title").click(() =>{
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#tutorial-title").offset().top
    }, 800);
  });
}


function assignClickListenersToSynthParamButtons(){

  let buttons = $(".synth-param-pair-container").find("button");
  buttons.each(function(){
    this.addEventListener("click",function(){
        
        let key = this.id.split("-")[0];
        let innerKey = this.id.split("-")[1];

        mRandomizationMap[key][innerKey].r = !mRandomizationMap[key][innerKey].r;
        let shouldRandomize = mRandomizationMap[key][innerKey].r;

        if(shouldRandomize){
          let masterKeys = Object.keys(mRandomizationMap);
          let index = masterKeys.indexOf(key);
          let color = mColors[mInitialColor+index];
          $(this).css("background-color",color);
        }else{
          $(this).css("background-color",mDefaultColor);
        }
    })
  });

}

function assignSynthParameters(){

  randomize();
  mInitialColor = getRandomInt(0,mColors.length-Object.keys(mRandomizationMap).length);
  let synth1Options = getRandomizedSynthesizerOptions(1);
  let synth2Options = getRandomizedSynthesizerOptions(2);

  mSynth1.set(synth1Options);
  mSynth2.set(synth2Options);

  updateUIWithNewParameters();


  // console.log("Synth1: ",JSON.stringify(synth1Options,null,null));
  // console.log("Synth1: ",JSON.stringify(mSynth1.get(),null,null));
  
  // console.log("Synth2: ",JSON.stringify(synth2Options,null,null));
  // console.log("Synth2: ",JSON.stringify(mSynth2.get(),null,null));

}


function updateUIWithNewParameters(){

  let masterKeys = Object.keys(mRandomizationMap);
  masterKeys.forEach(key =>{

      let innerKeys = Object.keys(mRandomizationMap[key]);
      innerKeys.forEach(innerKey =>{
          let item = mRandomizationMap[key][innerKey];
          let parsedId = "#"+key + "-"+innerKey;
          let units = (item.units !==undefined)?item.units:"";
          let value = item.value+ " "+units;
         
          $(parsedId).html(value);
          let shouldRandomize = item.r;
          if(shouldRandomize){
            let masterKeys = Object.keys(mRandomizationMap);
            let index = masterKeys.indexOf(key);
            let color = mColors[mInitialColor+index];
            $(parsedId).css("background-color",color);
          }else{
            $(parsedId).css("background-color",mDefaultColor);
          }
      });
  });
}


