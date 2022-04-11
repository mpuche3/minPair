const score = {
    "success": 0,
    "total": 0
}

document.getElementById('correct_answer_01').volume = 0.05
document.getElementById('wrong_answer_01').volume = 0.01
document.querySelector("#command_01").style.visibility = 'hidden';

all_words = a_words
sound_main = "hat"
sound_alternative = "hut"

document.querySelector("#sound_01").onclick = _ => play_sound(sound_alternative)
document.querySelector("#sound_02").onclick = _ => play_sound(sound_main)
document.querySelector("#sound_03").onclick = _ => play_sound(sound_alternative)
document.querySelector("#spelling_01").onclick = spelling_onclick
document.querySelector("#spelling_02").onclick = spelling_onclick
document.querySelector("#command_01").onclick = command_01_onclick
document.querySelector("#command_01").click()

function play_sound(sound){
    var msg = new SpeechSynthesisUtterance(sound);
    window.speechSynthesis.speak(msg);
}

function spelling_onclick(e) {
    score.total += 1;
    if (sound_main == e.target.value) {
        document.getElementById('correct_answer_01').play();
        document.querySelector("#title").innerHTML = "CORRECT"
        document.querySelector("#sound_02").value = sound_main
        document.querySelector("#spelling_01").onclick = _ => play_sound(document.querySelector("#spelling_01").value)
        document.querySelector("#spelling_02").onclick = _ => play_sound(document.querySelector("#spelling_02").value)
        document.querySelector("#command_01").style.visibility = 'visible';
        score.success += 1;
    } else{
        document.getElementById('wrong_answer_01').play();
        document.querySelector("#title").innerHTML = "INCORRECT"
        document.querySelector("#spelling_01").onclick = _ => play_sound(document.querySelector("#spelling_01").value)
        document.querySelector("#spelling_02").onclick = _ => play_sound(document.querySelector("#spelling_02").value)
        document.querySelector("#command_01").style.visibility = 'visible';
        score.success += 0;
    }
    document.querySelector("#score").innerHTML = score.success + " / " + score.total
}

function command_01_onclick(e){
    document.querySelector("#title").innerHTML = "Which word did you hear?"
    document.querySelector("#command_01").style.visibility = 'hidden';
    document.querySelector("#sound_02").value = "?"
    words = all_words[Math.floor(Math.random() * all_words.length)];
    document.querySelector("#spelling_01").value = words[0]
    document.querySelector("#spelling_02").value = words[1]
    document.querySelector("#spelling_01").onclick = spelling_onclick
    document.querySelector("#spelling_02").onclick = spelling_onclick
    if (Math.random()< 0.5) {
        sound_main = words[0]
        sound_alternative = words[1]
    } else {
        sound_main = words[1]
        sound_alternative = words[0]
    }
    document.querySelector("#sound_02").click()
}

document.addEventListener('keydown', (event) => {
    if (event.code === "KeyA") play_sound(sound_main)
    if (event.code === "KeyS") play_sound(sound_alternative)
    if (event.code === "ArrowLeft") document.querySelector("#spelling_01").click()
    if (event.code === "ArrowRight") document.querySelector("#spelling_02").click()
    if (event.code === "ArrowDown") document.querySelector("#command_01").click()
}, false);

document.addEventListener('click', event => {
    if (event.target.classList.contains("option")) {
        if (event.target.value === "a") all_words = a_words
        if (event.target.value === "i") all_words = i_words
        document.querySelector("#intro").style.display = "none"
        document.querySelector("#game").style.display = "block"
        document.querySelector("#command_01").click()
    }
}, false);