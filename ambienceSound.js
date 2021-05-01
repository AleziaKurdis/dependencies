"use strict";
//
//  ambienceSound.js
//
//  Created by Alezia Kurdis, April 30th, 2021.
//  Copyright 2021 Vircadia and contributors.
//
//  generate an audio background.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
(function(){ 

    var ROOT = Script.resolvePath('').split("ambienceSound.js")[0];
    var airSoundUrl = ROOT + "air.mp3";
    var airSound;
    var airSoundInjector = Uuid.NULL;
    var AIR_SOUND_VOLUME = 0.2;

    this.preload = function(entityID) {
        
        airSound = SoundCache.getSound(airSoundUrl);

        if (airSound.downloaded) {
            playAirSound();
        } else {
            airSound.ready.connect(onSoundReady);
        }
    };    

    function onSoundReady() {
        airSound.ready.disconnect(onSoundReady);
        playAirSound();
    }
    
    function playAirSound() {
        airSoundInjector = Audio.playSound(airSound, {
            "loop": true,
            "localOnly": true,
            "volume": AIR_SOUND_VOLUME
        });
    }
    
    this.unload = function(entityID) {
        if (airSoundInjector !== Uuid.NULL) {
            airSoundInjector.stop();
        }
    };  

})
