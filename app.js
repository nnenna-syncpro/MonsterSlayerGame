function getAttackValue(min, max) {
    //calculate damage done with 15 as max and 5 as min. Take the floor to round down
    //why do we add the minimum again in the formula???
    return Math.floor(Math.random() *(max - min)) + min;
}

const maxHealth = 100;


const app = Vue.createApp({
    data() {
        return {
            myHealth: maxHealth,
            monsterHealth: maxHealth,
            gameRound: 0,
            winner: null,
            battleLog: []
        };
    },
    methods: {
        playerAttacks(){
            const playerAttackValue = getAttackValue(5, 15);
            //reduce monster health by damage
            this.monsterHealth = this.monsterHealth - playerAttackValue;
            this.battleLogMessages('Player', 'attack', playerAttackValue);
            this.monsterAttacks();
            //everytime method is called is 1 round
            this.gameRound++;
        },
        monsterAttacks(){
            const monsterAttackValue = getAttackValue(10, 20);
            //reduce player health by damage
            this.myHealth -= monsterAttackValue;
            this.battleLogMessages('Monster', 'attack', monsterAttackValue);
        },
        playerSpecialAttack() {
            const playerAttackValue = getAttackValue(20, 30);
            this.monsterHealth -= playerAttackValue;
            this.battleLogMessages('Player', 'special attack', playerAttackValue);
            this.monsterAttacks();
            //make available only after playerAttacks is clicked 3 times
            this.gameRound++;
        },
        healPlayer() {
            playerHealValue = getAttackValue(15, 25);
            if (this.myHealth + playerHealValue > maxHealth){
                this.myHealth = maxHealth
            } else{
                this.myHealth += playerHealValue;
            }
            //healing counts as 1 round
            this.gameRound++;
            this.battleLogMessages('Player', 'heals', playerHealValue);
            //monster can still attack
            this.monsterAttacks();
        },
        startNewGame(){
            //reset all data properties
            this.myHealth = maxHealth;
            this.monsterHealth = maxHealth;
            this.gameRound = 0;
            this.winner = null;
            this.battleLog = [];
        },
        playerSurrenders(){
            this.winner = 'monster';
        },
        battleLogMessages(who, what, value){
            //unshoft is like push but adds at the begining not the end
            this.battleLog.unshift({
                by: who,
                action: what,
                value: value
            });
        }
    },
    computed: {
        monsterHealthBarStyle() {
            if (this.monsterHealth < 0){
                //-ve value cannot be displayed so we need to set it exactly to 0
                return {width:'0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        myHealthBarStyle(){
            if (this.myHealth < 0){
                return {width:'0%'};
            }
            return {width: this.myHealth + '%'};
        },
        enableSpecialAttack(){
            //how come {} disrupt the return if added?
            return this.gameRound % 3 !== 0;
        }
    },
    watch: {
        myHealth(value){
            if (value <=0 && this.monsterHealth <=0){
                //a draw
                this.winner = 'draw';
            } else if (value <= 0){
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if (value <=0 && this.myHealth <=0){
                //a draw
                this.winner = 'draw';
            } else if (value <= 0){
                //monster lost
                this.winner = 'player';
            }
        }
    }
});

app.mount('#game');