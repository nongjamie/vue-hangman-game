<template>
    <div class="container">
        <!-- Start section -->
        <div 
            class="startSection" 
            v-if="state == 'start'" >
            <h1>Let me know your name</h1>
            <div class="input-group flex-wrap">
                <div class="input-group-prepend">
                    <span 
                        class="input-group-text" 
                        id="addon-wrapping" 
                    >Enter your name</span>
                </div>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Ex. VaritKong" 
                    aria-label="Username" 
                    aria-describedby="addon-wrapping" 
                    v-model="userInput">
            </div>
            <button 
                type="button" 
                class="btn btn-outline-info" 
                @click="changeState('play')"
            > Confirm</button>
        </div>
        <!-- Play section -->
        <div 
            class="playSection" 
            v-if="state == 'play'">
            <h1>Hangman Game</h1>
            <div v-if="!gameStatus">
                <h2>Please select the vocabulary mode</h2>
                <button 
                    v-for="element in gameMode" 
                    :key="element" 
                    type="button" 
                    class="btn btn-primary" 
                    @click="gameModeSelection" 
                    :value="element"
                >{{ element }}</button>
            </div>
            <div v-else>
                <img :src="imgShow">
                <br><br>
                <p>{{ userAnswerStatus }}</p>
                <br><br>
                <span 
                    v-for="l in letters" 
                    :key="l"
                >&nbsp  <button 
                            :id="'button-' + l" 
                            :value="l" 
                            @click="userChoiceSelection"
                        >{{ l }}</button> 
                &nbsp</span>
            </div>
        </div>
        <!-- End section -->
        <div class="endSection" v-if="state == 'end'">
            <img :src="imgShow">
            <br><br>
            <p>{{ userAnswerStatus }}</p>
            <br><br>
            <div v-html="gameConclusion"></div>
            <router-link
                tag="button" 
                to="/"
                class="btn btn-outline-info"
            >Back to home page</router-link>
        </div>
    </div>
</template>

<script>
    import ConsoleStart from './ConsoleStart.vue'

    export default {
        components: {
            'app-console-start': ConsoleStart
        },
        data() {
            return {
                state: 'start',
                userInput: '',
                gameStatus: false,
                gameMode: ['Food', 'Sport', 'Animal'],
                gameModeSelected: '',
                gameDetail: {
                    'Food': ['yakisoba', 'sashimi', 'pizza'],
                    'Sport': ['basketball', 'football', 'tennis'],
                    'Animal': ['lizard', 'panda', 'turtle']
                },
                gameAnswer: '',
                userAnswer: [],
                userAnswerStatus: '',
                wrongLetters: [],
                letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                userLife: 7
            }
        },
        methods: {
            changeState(newState) {
                if(this.userInput === '') {
                    alert('Please fill in your name!')
                }
                else {
                    alert('Hello ' + this.userInput + ' , Welcome to hangman game :)')
                    this.state = newState
                    this.userInput = ''
                }
            },
            gameModeSelection(event) {
                this.gameModeSelected = event.target.value
                this.gameStatus = true
                this.randomWord()
            },
            randomWord() {
                let randomIndex = Math.floor(Math.random() * this.gameDetail[this.gameModeSelected].length)
                this.gameAnswer = this.gameDetail[this.gameModeSelected][randomIndex]
                this.runConsole()
            },
            runConsole() {
                for(let i = 0 ; i < this.gameAnswer.length ; i++) {
                    this.userAnswer.push('_')
                }
                this.updateUserAnswerStatus()
            },
            gameIsEnd() {
                if(this.userLife <= 0) {
                    this.state = 'end'
                    return true
                }
                else {
                    if(this.containWordInList('_', this.userAnswer)) {
                        return false
                    }
                    else {
                        this.state = 'end'
                        return true
                    }
                }
            },
            userChoiceSelection(event) {
                if(!this.gameIsEnd()) {
                    let letterSelection = event.target.value
                    console.log(event.target.id)
                    $('#' + event.target.id).attr('disabled', true);
                    if(this.containWordInList(letterSelection, this.gameAnswer)) {
                        let arrayIndexOfLetter = this.findIndexOfLetter(letterSelection)
                        this.fillInUserArray(arrayIndexOfLetter, letterSelection)
                        this.updateUserAnswerStatus()
                        console.log(this.userAnswer)
                        if(this.userLife == 0) {
                            this.gameIsEnd()
                        }
                    }
                    else {
                        this.userLife -= 1
                        console.log(this.userLife)
                        if(this.userLife == 0) {
                            this.gameIsEnd()
                        }
                    }
                }
                else {
                    console.log('Game is end')
                }
            },
            containWordInList(letter, list) {
                for(let i = 0 ; i < list.length ; i++) {
                    if(letter === list[i]) {
                        return true
                    }
                }
                return false
            },
            findIndexOfLetter(letter) {
                let arrayIndex = []
                for(let i = 0 ; i < this.gameAnswer.length ; i++) {
                    if(letter === this.gameAnswer[i]) {
                        arrayIndex.push(i)
                    }
                }
                return arrayIndex
            },
            fillInUserArray(arrayList, letter) {
                for(let i = 0 ; i < arrayList.length ; i++) {
                    this.userAnswer[arrayList[i]] = letter
                }
                console.log('hello from fillInUserArray')
                this.gameIsEnd()
            },
            updateUserAnswerStatus() {
                this.userAnswerStatus = ''
                for(let i = 0 ; i < this.userAnswer.length ; i++) {
                    this.userAnswerStatus = this.userAnswerStatus + '  ' + this.userAnswer[i]
                }
            }
        },
        computed: {
            imgShow() {
                switch(this.userLife) {
                    case 7:
                        return 'https://i.imgur.com/dRVEm4s.jpg'
                        break;
                    case 6:
                        return 'https://i.imgur.com/qLZ52Am.jpg'
                        break;
                    case 5:
                        return 'https://i.imgur.com/0jXqvg6.jpg'
                        break;
                    case 4:
                        return 'https://i.imgur.com/GgNwbE2.jpg'
                        break;
                    case 3:
                        return 'https://i.imgur.com/z1h4RQK.jpg'
                        break;
                    case 2:
                        return 'https://i.imgur.com/hXHnqgp.jpg'
                        break;
                    case 1:
                        return 'https://i.imgur.com/u1cc22X.jpg'
                        break;
                    case 0:
                        return 'https://i.imgur.com/FkEWQQV.jpg'
                        break;
                    default:
                        return 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/04/1496946239error.jpg'
                        break;
                }
            },
            userAnswerShow() {
                this.userAnswerShow = ''
                for(let i = 0 ; i < this.userAnswer.length ; i++) {
                    userAnswerShow = userAnswerShow + ' ' + this.userAnswer[i]
                }
            },
            gameConclusion() {
                let answer = ``
                if(this.userLife <= 0) {
                    answer = `
                        <h2>You lose !</h2>
                        <br>
                        <h3>This answer is ${this.gameAnswer}</h3>
                    `
                }
                else {
                    answer = `
                        <h2>Congratulations! You Win :)</h2>
                    `
                }
                return answer
            }
        }
    }
</script>

<style scoped>

    /* Start section */

    .startSection {
        margin: 10px 0px;
        text-align: center;
    }

    .startSection h1 {
        margin: 10px 0px;
    }

    .startSection .input-group {
        margin: 10px 0px;
    }

    .startSection .button {
        margin: 10px 0px;
    }

    /* Play section */

    .playSection {
        margin: 10px 0px;
        text-align: center;
    }

    .playSection .btn {
        margin: 0px 10px;
    }

    .playSection img {
        width: 50%;
        height: 50%;
    }

    /* End section */

    .endSection {
        margin: 10px 0px;
        text-align: center;
    }

    .endSection img {
        width: 50%;
        height: 50%;
    }

</style>
