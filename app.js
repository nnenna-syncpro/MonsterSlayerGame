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
            winner: null
        };
    },
    methods: {
        playerAttacks(){
            const playerAttackValue = getAttackValue(5, 15);
            //reduce monster health by damage
            this.monsterHealth = this.monsterHealth - playerAttackValue;
            this.monsterAttacks();
            //everytime method is called is 1 round
            this.gameRound++;
        },
        monsterAttacks(){
            const monsterAttackValue = getAttackValue(10, 20);
            //reduce player health by damage
            this.myHealth -= monsterAttackValue;
        },
        playerSpecialAttack() {
            const playerAttackValue = getAttackValue(20, 30);
            this.monsterHealth -= playerAttackValue;
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
            //monster can still attack
            this.monsterAttacks();
        }
    },
    computed: {
        monsterHealthBarStyle() {
            return {width: this.monsterHealth + '%'}
        },
        myHealthBarStyle(){
            return {width: this.myHealth + '%'}
        },
        enableSpecialAttack(){
            //how come {} disrupt the return if added?
            return this.gameRound % 3 !== 0
        }
    },
    watch: {
        myHealth(value){
            if (value <=0 && this.monsterHealth <=0){
                //a draw
                this.winner = 'DRAW';
            } else if (value <= 0){
                this.winner = 'MONSTER';
            }
        },
        monsterHealth(value){
            if (value <=0 && this.myHealth <=0){
                this.winner = 'DRAW';
            } else if (value <= 0){
                this.winner = 'PLAYER';
            }
        }
    }
});

app.mount('#game');