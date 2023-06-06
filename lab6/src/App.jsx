import React, {useEffect, useState} from 'react'
import './App.css'
import Card from './components/Card/Card.jsx'

const images = [
  {'src': 'https://i.postimg.cc/q7dY4292/Daki-600-3567107.jpg'},
  {'src': 'https://i.postimg.cc/hjD57c4j/Himeno-600-3438141.jpg'},
  {'src': 'https://i.postimg.cc/FRTny81x/Kitagawa-Marin-600-3563896.jpg'},
  {'src': 'https://i.postimg.cc/5yG7GzBY/Lucyna-Kushinada-full-3764178.jpg'},
  {'src': 'https://i.postimg.cc/RhqpXdHx/Makima-full-3103802.jpg'},
  {'src': 'https://i.postimg.cc/TPqswp6F/Nanakusa-Nazuna-600-3712720.jpg'},
  {'src': 'https://i.postimg.cc/3JVVfs1S/Shikimori-Micchon-600-3667209.jpg'},
  {'src': 'https://i.postimg.cc/NjXV3dPg/Yor-Briar-600-3632904.jpg'},
];


const App = () => {

  const [cards, setCards] = useState([])
  const [turnos, setTurnos] = useState(0)
  const[matched, setMatched] = useState(null)
  const [firstCard, setFirstCard] = useState(null)
  const [isGameWon, setIsGameWon] = useState(false)
  const [secondCard, setSecondCard] = useState(null)


  const flipCard = (Card) => {
    firstCard ? setSecondCard(Card) : setFirstCard(Card)
  }


  const shuffleCards = () => {
      const shuffledCards = [...images, ...images]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, isFlipped: false, id: Math.random() }))
      setCards(shuffledCards)
      setTurnos(0)
      setMatched(0)
      setIsGameWon(false)
  }

  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurnos( turnos + 1)
  }
  console.log({ cards })
  console.log({firstCard})
  console.log({ secondCard })

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.src === secondCard.src && firstCard.id !== secondCard.id) {
        console.log('match')
        setMatched(matched + 1)
        setCards(cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {...card, isFlipped: true}
          }
          return card
        }))
        newTurn()
        if (matched + 1 === 8) {
          setIsGameWon(true)
        }

      } else {
        console.log('no match')
        setTimeout(() => { newTurn() }, 1000)
      }
    }

  }, [firstCard, secondCard, matched])



  return (
    <div className='App'>
      <div className='contenedorTablero'>
        <h1 className='titulo'>RamiMemoria</h1>
        <div className='header'>
          <button onClick={shuffleCards } className="button-reload">
            <img src="https://i.postimg.cc/PNsWX3pH/refresh.png" alt="Reload" className='reload' />
          </button>
          <h2 className='turnCounter'>https://Turnos: {turnos}</h2>
        </div>
        <div className="tablero">
          {cards.map((card) => (
            <Card
              key={card.id}
              link={card.src}
              card={card}
              flipped={card === firstCard || card === secondCard || card.isFlipped}
              flipCard={flipCard}
            />
          ))}
          </div>
      </div>
      {isGameWon && (
        <div className="game-won">
          <div className="container-game-won">
            <h1 className = "wonMsj">¡Good boy! Te tomo: {turnos} turnos.</h1>
          </div>
          <button onClick={shuffleCards} className="again">Play Again</button>
        </div>
      )}
    </div>
  )

}


export default App
