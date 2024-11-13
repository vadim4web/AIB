document.addEventListener("DOMContentLoaded", function(){
document.getElementById("roll").addEventListener("click", roll);
document.getElementById("dice_img").addEventListener("click", dice);
document.getElementById("dDrobButton").addEventListener("click", dice);
var match_layer = document.createElement("div");
match_layer.id = 'match_layer';
match_layer.style.setProperty('width', '100%', 'important');
match_layer.style.setProperty('height', '100%', 'important');
match_layer.style.setProperty('z-index', '300', 'important');
document.body.appendChild(match_layer);
const drop_counter_max = 100;
const roll_counter_max = 50;
var display_combo_count = 0;
var colors_palette = ['rgb(255, 215, 0)', 'rgb(255, 69, 0)', 'rgb(0, 0, 205)', 'rgb(255, 0, 255', 'rgb(127, 255, 0)', 'rgb(0, 255, 255)', 'red'];
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var rolled = false;
var dropped = false;
var start_roll_counter = 8;
console.log(`start_roll_counter = ${start_roll_counter}`);
var roll_counter = start_roll_counter;
console.log(`roll_counter = ${roll_counter}`);
var roll_counter_insert = document.getElementById('roll_counter');
roll_counter_insert.innerHTML += `${roll_counter}`;
var roll_lots_list = [];
roll();
function roll() {
    console.log('roll()');
    console.log(`roll_counter = ${roll_counter}`);
    roll_counter--;
    console.log(`roll_counter -- = ${roll_counter}`);
    if (roll_counter == 6) {
        rolled = true;
    }
    if (roll_counter >= 0) {
        var allLots = document.getElementById('lots');
        var lotsNodes = allLots.children;
        var node = document.getElementById('roll_counter');
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var div_insert = document.getElementById('roll_counter');
        div_insert.innerHTML += `${roll_counter}`;
        while(roll_lots_list.length) {
            roll_lots_list.pop();
        }
        for (var i = 0; i < lotsNodes.length; i++) {
            var singleLot = document.getElementById(`lot${i+1}`);
            let random1 = getRandomIntInclusive(0, 6);
            let random2 = getRandomIntInclusive(0, 6);
            var DOM_img1 = document.createElement("img");
            var DOM_img2 = document.createElement("img");
            DOM_img1.src = `static/images/${random1}.jpg`;
            DOM_img1.width = 57;
            DOM_img1.height = 57;
            DOM_img2.src = `static/images/${random2}.jpg`;
            DOM_img2.width = 57;
            DOM_img2.height = 57;
            var lot = [random1, random2];
            roll_lots_list[i] = lot;
            while (singleLot.firstChild) {
                singleLot.removeChild(singleLot.firstChild);
            }
            singleLot.appendChild(DOM_img1);
            singleLot.appendChild(DOM_img2);
        }
    }
    if (rolled || dropped) {
        check_if_match();
    }
}
var drop_counter = 0;
var drop_counter_insert = document.getElementById('drop_counter');
drop_counter_insert.innerHTML += `${drop_counter}`;
var luck_index = 8;
var luck_index_insert = document.getElementById('luck_index');
luck_index_insert.innerHTML += `${luck_index}`;
var dice_pair_list = [];
var bonus = Math.floor(luck_index / 7);
console.log(`bonus = ${bonus}`);
dice();
function dice() {
    console.log('dice()');
    drop_counter++;
    if (drop_counter == 2) {
        dropped = true;
    }
    var list_index = drop_counter - 1;
    if (drop_counter < 8) {
        luck_index--;
        while (luck_index_insert.firstChild) {
            luck_index_insert.removeChild(luck_index_insert.firstChild);
        }
        luck_index_insert.innerHTML += `${luck_index}`;
        var node = document.getElementById('drop_counter');
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var div = document.getElementById('drop_counter');
        div.innerHTML += `${drop_counter}`;
        var dice = document.getElementById('diceTwo');
        var diceOne = dice.children;
        var pair_container = document.createElement("div");
        pair_container.id = `pair_${drop_counter}`;
        pair_container.style.setProperty('background-color', 'maroon', 'important');
        dice.appendChild(pair_container);
        var single_pair = [];
        for (var i = 0; i < 2; i++) {
            var diceOne = document.getElementById(`pair_${drop_counter}`);
            let random = getRandomIntInclusive(0, 6);
            single_pair[i] = random;
            var DOM_img = document.createElement("img");
            DOM_img.src = `static/images/${random}.jpg`;
            DOM_img.width = 86;
            DOM_img.height = 86;
            diceOne.appendChild(DOM_img);
        }
        dice_pair_list[list_index] = single_pair;
    }
    else if (drop_counter >= 8 && drop_counter <= drop_counter_max) {
        var node = document.getElementById('drop_counter')
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var div = document.getElementById('drop_counter');
        div.innerHTML += `${drop_counter}`;
        alert(`this is EXTRA drop_counter = ${drop_counter}`)
        var dice = document.getElementById('diceTwo');
        var dice_pairs = dice.children;
        var pair_count = dice_pairs.length;
        var dice_first = dice.firstChild;
        dice.removeChild(dice_first);
        var pair_container = document.createElement("div");
        pair_container.id = `pair_${drop_counter}`;
        pair_container.style.setProperty('background-color', 'maroon', 'important');
        dice.appendChild(pair_container);
        dice_pair_list.shift();
        var single_pair = [];
        for (var i = 0; i < 2; i++) {
            var diceOne = document.getElementById(`pair_${drop_counter}`);
            let random = getRandomIntInclusive(0, 6);
            single_pair[i] = random;
            var DOM_img = document.createElement("img");
            DOM_img.src = `static/images/${random}.jpg`;
            DOM_img.width = 86;
            DOM_img.height = 86;
            diceOne.appendChild(DOM_img);
        }
        var last_index = dice_pair_list.length;
        dice_pair_list[last_index] = single_pair;
    }
    if (rolled || dropped) {
        check_if_match();
    }
}
check_if_match();
function check_if_match() {
    console.log('check_if_match()');
    match_layer_cleaner();
    svg_layer_cleaner();
    var allLots = document.getElementById('lots');
    var lots_nodes = allLots.children;
    var lots = lots_nodes.length;
    var allDices = document.getElementById('diceTwo');
    var dice_pairs = allDices.children;
    var dices = dice_pairs.length;
    if (roll_lots_list.values()) {
        var rolls = roll_lots_list.values();
    }
    if (dice_pair_list.values()) {
        var dices = dice_pair_list.values();
    }
    var rolls_amount = roll_lots_list.length;
    var dices_amount = dice_pair_list.length;
    var match_00 = new Set();
    var match_01 = new Set();
    var match_02 = new Set();
    var match_03 = new Set();
    var match_04 = new Set();
    var match_05 = new Set();
    var match_06 = new Set();
    var match_11 = new Set();
    var match_12 = new Set();
    var match_13 = new Set();
    var match_14 = new Set();
    var match_15 = new Set();
    var match_16 = new Set();
    var match_22 = new Set();
    var match_23 = new Set();
    var match_24 = new Set();
    var match_25 = new Set();
    var match_26 = new Set();
    var match_33 = new Set();
    var match_34 = new Set();
    var match_35 = new Set();
    var match_36 = new Set();
    var match_44 = new Set();
    var match_45 = new Set();
    var match_46 = new Set();
    var match_55 = new Set();
    var match_56 = new Set();
    var match_66 = new Set();
    var match_sets = new Set();
    match_sets.add(match_00);
    match_sets.add(match_01);
    match_sets.add(match_02);
    match_sets.add(match_03);
    match_sets.add(match_04);
    match_sets.add(match_05);
    match_sets.add(match_06);
    match_sets.add(match_11);
    match_sets.add(match_12);
    match_sets.add(match_13);
    match_sets.add(match_14);
    match_sets.add(match_15);
    match_sets.add(match_16);
    match_sets.add(match_22);
    match_sets.add(match_23);
    match_sets.add(match_24);
    match_sets.add(match_25);
    match_sets.add(match_26);
    match_sets.add(match_33);
    match_sets.add(match_34);
    match_sets.add(match_35);
    match_sets.add(match_36);
    match_sets.add(match_44);
    match_sets.add(match_45);
    match_sets.add(match_46);
    match_sets.add(match_55);
    match_sets.add(match_56);
    match_sets.add(match_66);
    for (var i = 0; i < rolls_amount; i++) {
        var current_lot = roll_lots_list[i];
        var current_dig1 = current_lot[0];
        var current_dig2 = current_lot[1];
        if (current_dig1 == 0 && current_dig2 == 0) {
            match_00.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 1) || (current_dig1 == 1 && current_dig2 == 0)) {
            match_01.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 2) || (current_dig1 == 2 && current_dig2 == 0)) {
            match_02.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 0)) {
            match_03.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 0)) {
            match_04.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 0)) {
            match_05.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 0)) {
            match_06.add(`lot${i+1}`);
        }
        else if (current_dig1 == 1 && current_dig2 == 1) {
            match_11.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 2) || (current_dig1 == 2 && current_dig2 == 1)) {
            match_12.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 1)) {
            match_13.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 1)) {
            match_14.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 1)) {
            match_15.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 1)) {
            match_16.add(`lot${i+1}`);
        }
        else if (current_dig1 == 2 && current_dig2 == 2) {
            match_22.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 2)) {
            match_23.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 2)) {
            match_24.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 2)) {
            match_25.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 2)) {
            match_26.add(`lot${i+1}`);
        }
        else if (current_dig1 == 3 && current_dig2 == 3) {
            match_33.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 3)) {
            match_34.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 3)) {
            match_35.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 3)) {
            match_36.add(`lot${i+1}`);
        }
        else if (current_dig1 == 4 && current_dig2 == 4) {
            match_44.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 4 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 4)) {
            match_45.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 4 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 4)) {
            match_46.add(`lot${i+1}`);
        }
        else if (current_dig1 == 5 && current_dig2 == 5) {
            match_55.add(`lot${i+1}`);
        }
        else if ((current_dig1 == 5 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 5)) {
            match_56.add(`lot${i+1}`);
        }
        else if (current_dig1 == 6 && current_dig2 == 6) {
            match_66.add(`lot${i+1}`);
        }
        else {
            alert('fucked out on roll()!')
        }
    }
    for (var j = 0; j < dices_amount; j++) {
        var current_lot = dice_pair_list[j];
        var current_dig1 = current_lot[0];
        var current_dig2 = current_lot[1];
        var drop_counter_with;
        if (drop_counter < 8) {
            drop_counter_with = j + 1;
        }
        else if (drop_counter >= 8 && drop_counter <= drop_counter_max ){
            drop_counter_with = j + 1 + drop_counter - 7;
        }
        else {
            alert('Fuck You !');
        }
        if (current_dig1 == 0 && current_dig2 == 0) {
            match_00.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 1) || (current_dig1 == 1 && current_dig2 == 0)) {
            match_01.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 2) || (current_dig1 == 2 && current_dig2 == 0)) {
            match_02.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 0)) {
            match_03.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 0)) {
            match_04.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 0)) {
            match_05.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 0 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 0)) {
            match_06.add(`pair_${drop_counter_with}`);
        }
        else if (current_dig1 == 1 && current_dig2 == 1) {
            match_11.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 2) || (current_dig1 == 2 && current_dig2 == 1)) {
            match_12.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 1)) {
            match_13.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 1)) {
            match_14.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 1)) {
            match_15.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 1 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 1)) {
            match_16.add(`lot${i+1}`);
        }
        else if (current_dig1 == 2 && current_dig2 == 2) {
            match_22.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 3) || (current_dig1 == 3 && current_dig2 == 2)) {
            match_23.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 2)) {
            match_24.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 2)) {
            match_25.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 2 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 2)) {
            match_26.add(`lot${i+1}`);
        }
        else if (current_dig1 == 3 && current_dig2 == 3) {
            match_33.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 4) || (current_dig1 == 4 && current_dig2 == 3)) {
            match_34.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 3)) {
            match_35.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 3 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 3)) {
            match_36.add(`pair_${drop_counter_with}`);
        }
        else if (current_dig1 == 4 && current_dig2 == 4) {
            match_44.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 4 && current_dig2 == 5) || (current_dig1 == 5 && current_dig2 == 4)) {
            match_45.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 4 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 4)) {
            match_46.add(`pair_${drop_counter_with}`);
        }
        else if (current_dig1 == 5 && current_dig2 == 5) {
            match_55.add(`pair_${drop_counter_with}`);
        }
        else if ((current_dig1 == 5 && current_dig2 == 6) || (current_dig1 == 6 && current_dig2 == 5)) {
            match_56.add(`pair_${drop_counter_with}`);
        }
        else if (current_dig1 == 6 && current_dig2 == 6) {
            match_66.add(`pair_${drop_counter_with}`);
        }
        else {
            alert('fucked out on dice()!')
        }
    }
    display_combo_count = 0;
    find_match(match_sets);
}
var deuce_counter = 0;
var triple_counter = 0;
var quadro_counter = 0;
var penta_counter = 0;
var hexa_counter = 0;
var septa_counter = 0;
function find_match(set_combinations__id) {
    console.log('find_match()');
    var bonus_value = 1;
    for(let combination of set_combinations__id) {
        if (combination.size == 2) {
            deuce_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 3) {
            triple_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus * 2);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 4) {
            quadro_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus * 3);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 5) {
            penta_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus * 5);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 6) {
            hexa_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus * 5);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 7) {
            alert('Ff Uu Cc Kk *. *. *. Ss Ee Vv Ee Nn !. !. !.')
            septa_counter++;
            display_match(combination);
            console.log(`match_2_plus before ++  ${display_combo_count}`);
            display_combo_count++;
            bonus_value = Math.round(bonus * 7);
            roll_counter_mode(bonus_value);
            console.log(`match_2_plus after ++  ${display_combo_count}`);
        }
        else if (combination.size == 1) {
            reset_styles(combination);
        }
        else {
            console.log(`there is nothing to look here....`);
        }
        if (drop_counter < 0) {
            drop_counter = 0;
        }
        if (roll_counter > roll_counter_max) {
            console.log(`You've already used all ${roll_counter_max} rolls!`);
            roll_counter = roll_counter_max;
        }
    }
}
function reset_styles(combo) {
    console.log('reset_styles()');
    console.log(combo);
    for(let id of combo) {
        console.log('*');
        console.log(id);
        console.log(typeof(id));
        var pair_to_light = document.getElementById(id);
        console.log(pair_to_light);
        console.log(typeof(pair_to_light));
        pair_to_light.style.setProperty('background-color', 'maroon', 'important');
    }
}
function match_layer_cleaner() {
    console.log('match_layer_cleaner()');
    var match_layer = document.getElementById('match_layer');
    if (match_layer.firstChild) {
        while (match_layer.firstChild) {
            match_layer.removeChild(match_layer.firstChild);
        }
    }
}
function svg_layer_cleaner() {
    console.log('svg_layer_clener()');
    var svg_layer = document.getElementById('match_lines');
    if (svg_layer.firstChild) {
        while (svg_layer.firstChild) {
            svg_layer.removeChild(svg_layer.firstChild);
        }
    }
}
function offset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function display_match(combo) {
    console.log('display_match()');
    console.log(`colors_palette use in [] - ${colors_palette}`);
    console.log(`display_combo_count = ${display_combo_count}`);
    var color = colors_palette[display_combo_count];
    console.log(combo);
    var match_layer = document.getElementById('match_layer')
    for(let id of combo) {
        console.log('*');
        console.log(id);
        console.log(typeof(id));
        var pair_to_light = document.getElementById(id);
        console.log(pair_to_light);
        console.log(typeof(pair_to_light));
        pair_to_light.style.setProperty('background-color', 'green', 'important');
        var divOffset = offset(pair_to_light);
        console.log(divOffset.left, divOffset.top);
        var offsetWidth = pair_to_light.offsetWidth;
        var offsetHeight = pair_to_light.offsetHeight;
        console.log(`offsetWidth = ${offsetWidth}`);
        console.log(`offsetHeight = ${offsetHeight}`);
        var center_by_y = Math.round(divOffset.top + offsetHeight / 2) - 10;
        var center_by_x = Math.round(divOffset.left + offsetWidth / 2) - 10;
        console.log(`center_by_x = ${center_by_x}`);
        console.log(`center_by_y = ${center_by_y}`);
        var centred_dot = document.createElement("div");
        centred_dot.style.setProperty('width', '20px', '');
        centred_dot.style.setProperty('height', '20px', '');
        centred_dot.style.setProperty('top', `${center_by_y}px`, '');
        centred_dot.style.setProperty('left', `${center_by_x}px`, '');
        centred_dot.style.setProperty('border-radius', '50%', '');
        centred_dot.style.setProperty('background-color', `${color}`, 'important');
        centred_dot.style.setProperty('border-color', `${color}`, 'important');
        centred_dot.style.setProperty('position', 'absolute', '');
        match_layer.appendChild(centred_dot);
    }
    var combo_array = Array.from(combo);
    for (var i = 0; i < combo_array.length; i++) {
        var id_start = combo_array[i];
        var start = document.getElementById(id_start);
        var start_offset = offset(start);
        console.log(start_offset);
        var start_offsetWidth = start.offsetWidth;
        var start_offsetHeight = start.offsetHeight;
        var start_y = Math.round(start_offset.top + start_offsetHeight / 2);
        var start_x = Math.round(start_offset.left + start_offsetWidth / 2);
        if (id_start == combo_array[combo_array.length-1]) {
            var id_end = combo_array[0];
        }
        else {
            var id_end = combo_array[i+1];
        }
        var end = document.getElementById(id_end);
        var end_offset = offset(end);
        console.log(end_offset);
        var end_offsetWidth = end.offsetWidth;
        var end_offsetHeight = end.offsetHeight;
        var end_y = Math.round(end_offset.top + end_offsetHeight / 2);
        var end_x = Math.round(end_offset.left + end_offsetWidth / 2);
        var lines = document.getElementById('match_lines');
        var match_line = document.createElementNS('http://www.w3.org/2000/svg','line');
        match_line.setAttribute('x1', `${start_x}`);
        match_line.setAttribute('y1', `${start_y}`);
        match_line.setAttribute('x2', `${end_x}`);
        match_line.setAttribute('y2', `${end_y}`);
        match_line.style.setProperty('stroke', `${color}`, 'important');
        match_line.style.setProperty('stroke-width', '5', 'important');
        lines.appendChild(match_line);
    }
    display_combo_count++;
}
function roll_counter_mode(bonus) {
    console.log('roll_counter_mode()');
    console.log(`roll_counter = ${roll_counter}`);
    console.log(`bonus = ${bonus}`);
    roll_counter += bonus;
    console.log(`roll_counter = ${roll_counter}`);
}
});
