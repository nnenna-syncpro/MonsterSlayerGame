function getAttackValue(min, max) {
    //calculate damage done with 15 as max and 5 as min. Take the floor to round down
    //why do we add the minimum again in the formula???
    return Math.floor(Math.random() *(max - min)) + min;
}


const app = Vue.createApp({
    data() {
        return {
            myHealth: 100,
            monsterHealth: 100,
        };
    },
    methods: {
        playerAttacks(){
            const playerAttackValue = getAttackValue(5, 15);
            //reduce monster health by damage
            this.monsterHealth = this.monsterHealth - playerAttackValue;
            this.monsterAttacks();
        },
        monsterAttacks(){
            const monsterAttackValue = getAttackValue(10, 20);
            //reduce player health by damage
            this.myHealth -= monsterAttackValue;
        },
        playerSpecialAttack() {
            const playerAttackValue = getAttackValue(15, 30);
            this.monsterHealth -= playerAttackValue;
            this.monsterAttacks();
            //make available only after playerAttacks is clicked 3 times
        }
    },
    computed: {
        monsterHealthBarStyle() {
            return {width: this.monsterHealth + '%'}
        },
        myHealthBarStyle(){
            return {width: this.myHealth + '%'}
        }
    }
});

app.mount('#game');