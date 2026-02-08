
import express from 'express';

import dogFacts from './dog_facts.js';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send("Welcome to the Dog Facts API! Use /facts to get random dog facts.");
}) ;

app.get('/facts', (req, res) => {
    try {
        const numparam = req.query.number;
        const randomFacts = [];
        let temparr = [...dogFacts];
        const count = numparam !== undefined ? parseInt(numparam) : 1;

        if (isNaN(count) || count <= 0) {
           return res.status(400).json({ error: 'Invalid number parameter. It should be a positive integer.' });
        }

        const actualcount = Math.min(count, dogFacts.length);

        // splicing to remove duplicates using a temparr to store the remaining facts and randomly select from it
        for (let i = 0; i < actualcount; i++) {
            const randomIndex = Math.floor(Math.random() * temparr.length);
            randomFacts.push(temparr[randomIndex]);
             temparr.splice(randomIndex, 1);
         }

        res.json({
            facts: randomFacts,
            success: true,
            note: count > dogFacts.length ? `Requested ${count} facts, but only ${dogFacts.length} are available. Returning all available facts.` : undefined
            });

        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch dog facts',
                success: false
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});