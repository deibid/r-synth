


//Master object map that contains the schema for the randomization rules.
let mRandomizationMap = {
    "oscillator1":{
        "volume":{
            "r":false,
            "type":"numeric-integer",
            "min":-20,
            "max":0,
            "value":0,
            "units":"dB"
        },
        "type":{
            "r":true,
            "type":"set",
            "options":["sine","square","sawtooth","triangle"],
            "value":"sine"
        }
    },
    "oscillator2":{
        "volume":{
            "r":true,
            "type":"numeric-integer",
            "min":-20,
            "max":0,
            "value":0,
            "units":"dB"
        },
        "type":{
            "r":true,
            "type":"set",
            "options":["sine","square","sawtooth","triangle"],
            "value":"sine"
        }
    },
    "envelope":{
        "attack":{
            "r":true,
            "type":"numeric-normalized",
            "value":0.5,
            "units":"s"
        },
        "decay":{
            "r":true,
            "type":"numeric-normalized",
            "value":0.5,
            "units":"s"
        },
        "sustain":{
            "r":true,
            "type":"numeric-normalized",
            "value":1,
            "units":"/1"
        },
        "release":{
            "r":true,
            "type":"numeric-normalized",
            "value":1,
            "units":"s"
        },
    },
    "filter":{
        "type":{
            "r":false,
            "type":"set",
            "options":["lowpass","highpass"],
            "value":"lowpass"
        },
        "frequency":{
            "r":true,
            "type":"numeric-integer",
            "min":1000,
            "max":0,
            "value":200,
            "units":"Hz"
        },
    },
    "filterEnvelope":{
        "frequency":{
            "r":true,
            "type":"numeric-integer",
            "min":1000,
            "max":0,
            "value":0,
            "units":"Hz"
        },
        "attack":{
            "r":true,
            "type":"numeric-normalized",
            "value":0,
            "units":"s"
        },
        "decay":{
            "r":true,
            "type":"numeric-normalized",
            "value":0,
            "units":"s"
        },
        "sustain":{
            "r":true,
            "type":"numeric-normalized",
            "value":0,
            "units":"/1"
        },
        "release":{
            "r":true,
            "type":"numeric-normalized",
            "value":0,
            "units":"s"
        }
    }
};


function getRandomizedSynthesizerOptions(synthNumber){

    let synthOptions = extractSynthOptionsFromMap(synthNumber);
    return synthOptions;

}

function randomize(){
    traverseAndRandomize();
}


/**
 * FUnction that converts the randomization map into a set of SYnthOptions that we can use with a Tone.MonoSynth
 * @param {Number} synthNumber 
 */
function extractSynthOptionsFromMap(synthNumber){

    let synthOptions = {

        "oscillator":{
            "volume":mRandomizationMap["oscillator"+synthNumber].volume.value,
            "type":mRandomizationMap["oscillator"+synthNumber].type.value,
        },
        "envelope":{
            "attack":mRandomizationMap["envelope"].attack.value,
            "decay":mRandomizationMap["envelope"].decay.value,
            "sustain":mRandomizationMap["envelope"].sustain.value,
            "release":mRandomizationMap["envelope"].release.value
        },
        "filter":{
            "type":mRandomizationMap["filter"].type.value,
            "frequency":mRandomizationMap["filter"].frequency.value
        },
        "filterEnvelope":{
            "frequency":mRandomizationMap["filterEnvelope"].frequency.value,
            "attack":mRandomizationMap["filterEnvelope"].attack.value,
            "decay":mRandomizationMap["filterEnvelope"].decay.value,
            "sustain":mRandomizationMap["filterEnvelope"].sustain.value,
            "release":mRandomizationMap["filterEnvelope"].release.value

        }

    }

    return synthOptions;

}


/**
 * Function that traverses the Ranomization Map and follows a few rules to get a ranomized value where it needs to
 */
function traverseAndRandomize(){

    
    let masterKeys = Object.keys(mRandomizationMap);

    // console.log("Master Keys    ------- "+masterKeys);

    masterKeys.forEach(key =>{

        let innerKeys = Object.keys(mRandomizationMap[key]);

        // console.log("Inner Keys    ------- "+innerKeys);

        innerKeys.forEach(innerKey =>{
            let item = mRandomizationMap[key][innerKey];

            if(item.r === false) return;

            

            switch(item.type){

                case "numeric-integer":
                    item.value = getRandomInt(item.min, item.max);
                break;

                case "set":
                    item.value = getRandomItemFromArray(item.options);
                break;

                case "numeric-normalized":
                    item.value = getRandomNormalizedFloat();
                break;
            }
        });
    });

}




/** UTILITY STATIC FUNCTIONS */

function getRandomItemFromArray(array){
    let i = Math.floor(Math.random()*array.length);
    return array[i];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomNormalizedFloat() {
    return parseFloat(Math.random().toFixed(3));
}




/** UTILITY STATIC FUNCTIONS */










