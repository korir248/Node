const express = require('express');
const app = express();
const port = process.env.PORT

app.use(express.json());

const isPalindrome = (word) => {
    word = word.toLowerCase()
    let word2 = word.split("").reverse().join("");
    return word === word2
};



app.post('/palindrome', (req, res)=> {
    const { word } = req.body;
    
    if(word){
        const is_palindrome = isPalindrome(word);
        is_palindrome ? `${word} is a palindrome` : `${word} is not a palindrome`

    }else{
        res.status(400).send('Missing "word" in POST request.');

    }   
    
    
    
        
      
});


app.post('/anagram', function(req, res) {
    const body = req.body;
    const word1 = body.word1;
    const word2 = body.word2;
    if (word1 === undefined || word2 === undefined) {
        res.status(400).send('Missing "word1" and/or "word2" in POST request.')
    } else {
        const anagrams = areAnagrams(word1, word2);
        res.send(`"${word1}" and "${word2}" are${anagrams ? "" : " not"} anagrams.`);
    }
});


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});