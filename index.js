
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1,
        "message": "Please send a POST request to this endpoint with your data.",
        "sample_request": {
            "data": ["a", "1", "334", "4", "R", "$"]
        }
    });
});


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        const email = "vaibhav.pant2022@vitstudent.ac.in";
        const rollNumber = "22BCE1273";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const alpha_chars_for_concat = [];


        data.forEach(item => {
            if (!isNaN(item)) {
                const num = Number(item);
                sum += num; 
                if (num % 2 === 0) {
                    even_numbers.push(String(item));
                } else {
                    odd_numbers.push(String(item));
                }
            }
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
                alpha_chars_for_concat.push(item);
            }
            else {
                special_characters.push(String(item));
            }
        });

     
        const concat_string = alpha_chars_for_concat
            .join('')
            .split('')
            .reverse()
            .join('')
            .split('')
            .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
            .join('');


        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({
            is_success: false,
            error: "Internal Server Error."
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('API is running. Use POST /bfhl to submit data.');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
