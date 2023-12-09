//utworzenie serwera express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/calculate/:operation/:num1/:num2', (req, res) => {
  const { operation, num1, num2 } = req.params;
  let result;

  switch (operation) {
    case 'add':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'subtract':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multiply':
        result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
        if (parseFloat(num2) !== 0) {
          result = parseFloat(num1) / parseFloat(num2);
        } else {
          result = 'Cannot divide by zero';
        }
      break;
    case 'power':
        result = Math.pow(parseFloat(num1), parseFloat(num2));
      break;
 
    default:
      result = 'Invalid operation';
  }

  res.json({ result });
});

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/calculatorDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));
db.once('open', () => {
  console.log('Połączono z bazą danych');
});


