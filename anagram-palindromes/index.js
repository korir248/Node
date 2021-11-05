require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT 

app.use(express.json());

const isPalindrome = (word) => {
    word = word.toLowerCase()
    let word2 = word.split("").reverse().join("");
    return word === word2
}
const areAnagrams = (word1, word2)=>{
    if(word1.length !== word2.length){
        return false
    }
    for(let letter of word1) {
        if (word2.includes(letter)) {
            word2 = word2.replace(letter, "");
        }
      }
    
      return word2 ? false : true;

}

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/palindrome", (req, res)=> {
    const { word } = req.body;
    
    if(word){
        const is_palindrome = isPalindrome(word);
        res.status(200).send(is_palindrome ? `${word} is a palindrome` : `${word} is not a palindrome`)

    }else{
        res.status(400).send('Missing values in request body');

    }
        
      
});


app.post("/anagram", (req, res)=> {
    const {word1, word2} = req.body;
    
    if (word1 === undefined){
        res.status(400).send('Missing word1 request body')

    } else if(word2 === undefined) {
        res.status(400).send('Missing word2 in request body')
    } else {
        const anagrams = areAnagrams(word1, word2);
        res.send(`${word1} and ${word2} are ${anagrams ? "" : "not "}anagrams`);
    }
})


app.listen(port, () => {
    console.log(`App running on port ${port}`);
})