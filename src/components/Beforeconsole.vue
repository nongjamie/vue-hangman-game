<template>
    <div class="container">
        <!-- Rules section -->
        <div class="ruleSection">
            <h1>Rules of the game</h1><br>
            <p>{{ gamerules }}</p>
        </div>
        <!-- Button section -->
        <div class="buttonSection">
            <router-link 
                tag="button" 
                to="/gameConsole"
                class="btn btn-outline-info"
            >Let's start</router-link>
            <router-link 
                tag="button" 
                to="/"
                class="btn btn-outline-info"
            >Back</router-link>
        </div>
    </div>    
</template>

<script>
    export default {
        data() {
            return {
                gamerules: `The word to guess is represented by a row of dashes,
                representing each letter of the word. In most variants, proper 
                nouns, such as names, places, and brands, are not allowed. 
                Slang words, sometimes referred to as informal or shortened words, 
                are also not allowed. If the guessing player suggests a letter 
                which occurs in the word, the other player writes it in all its 
                correct positions. If the suggested letter or number does not 
                occur in the word, the other player draws one element of 
                a hanged man stick figure as a tally mark. The player guessing 
                the word may, at any time, attempt to guess the whole word. 
                If the word is correct, the game is over and the guesser wins. 
                Otherwise, the other player may choose to penalize the guesser 
                by adding an element to the diagram. On the other hand, 
                if the other player makes enough incorrect guesses to allow his 
                opponent to complete the diagram, the game is also over, 
                this time with the guesser losing. However, the guesser can 
                also win by guessing all the letters or numbers that appears in 
                the word, thereby completing the word, before the diagram is completed.`
            }
        }
    }
</script>

<style scoped>

    /* Rule section */

    .ruleSection {
        text-align: center;
        margin: 20px 0px;
    }

    .ruleSection p {
        text-align: left;
        text-indent: 10%;
    }

    /* Button section */

    .buttonSection {
        text-align: center;
        margin: 20px 0px;
    }

    .buttonSection .btn {
        font-size: 20px;
    }

</style>
