import { useState } from 'react';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>;

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Display counter={counter} />
      <Button onSmash={increaseByOne} text="plus" />
      <Button onSmash={setToZero} text="zero" />
      <Button onSmash={decreaseByOne} text="minus" />
    </div>
  );
};
export default App;
