document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What's your Name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    }
    else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};
//EFFECT DURATION
let duration = 1000;

//SELECT BLOCKS CONTAINER
let blocksContainer = document.querySelector(".memory-game-blocks");

//CREATE ARRAY FROM GAME BLOCKS
let blocks = Array.from(blocksContainer.children);

//CREATE RANGE OF KEYS
let orderRange = [...Array(blocks.length).keys()];
//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);

//ADD ORDER CSS PROPERTY TO GAME BLOCKS
blocks.forEach((block, index) => {
    //ADD CSS ORDER PROPERTY
    block.style.order = orderRange[index];

    //ADD CLICK EVENT
    block.addEventListener('click', function () {

        //TRIGGER THE FLIP BLOCK FUNCTION
        flipBlock(block);
    })
})

function flipBlock(selectedBlock) {

    //FLIP BLOCK FUNCTION
    selectedBlock.classList.add('is-flipped');

    //COLLECT ALL FLIPPED CARDS
    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));
    // IF THERE TWO SELECTED BLOCKS
    if (allFlippedBlocks.length === 2) {
        //STOP CLICKING FUNCTION
        stopClicking();
        //CHECK MATCHED BLOCK FUNCTION
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}


//stop clicking FUNCTION
function stopClicking() {
    //ADD CLASS NO CLICKING ON MAIN CONTAINER
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        //REMOVE CALLS NO-CLICKING AFTER THW DURATION
        blocksContainer.classList.remove("no-clicking");
    }, duration);

}

//CHECK MATCHED BLOCK FUNCTION
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

//SHUFFLE Array
//console.log(orderRange.sort(() => Math.random() - 0.5));

//SHUFFLE FUNCTION
function shuffle(array) {
    // SETTING VARS
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        //GET RANDOM NUMBER
        random = Math.floor(Math.random() * current);
        //DECREASE LENGTH BY ONE
        current--;
        //[1]sAVE CURRENT ELEMENT IN STASH
        temp = array[current];
        //[2] CURRENT ELEMENT = RANDOM ELEMENT
        array[current] = array[random];
        //[3] random element = get element from stash
        array[random] = temp;
    }
    return array;
}
