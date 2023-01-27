const express = require('express')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
const cors = require('cors')

app.use(express.json())
app.use(cors());



app.use(express.static(`${__dirname}/public`));

const Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: 'cda2d4b1c0a34b9cad67c7a0506864ce',
    captureUncaught: true,
    captureUnhandledRejections: true,
})
rollbar.log("Hello ROLLBAR!");

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        rollbar.error(error, 'Error getting bots')
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.info('Choices displayed!')
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.error(error, 'Error getting five bots')
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            rollbar.info('User Lost!')
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            rollbar.info('User Won!')
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.error(error, 'Error Dueling')
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.error(error, 'ERROR GETTING PLAYER STATS')
        res.sendStatus(400)
    }
})

app.listen(4000, () => {
  console.log(`Listening on 4000`)
})