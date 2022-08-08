import { useState, useRef, useEffect } from 'react';
import HtmlHead from '../layouts/head';
import Timer from '../components/timer.component'
import isEmpty from '../utils/isEmpty';
import TestScreen from '../components/test-screen.component';
import SuccessModal from '../components/success-modal.component'
import { Container, ContentBox, TimeBox, Points } from '../utils/elements'
import FirstScreen from '../components/first-screen.component';
import Scores from '../components/scores.component'
import { timeData, paragraphData } from '../utils/constants'
import { nonZero } from '../utils/nonZero'


export default function Home() {
  const [test, setTest] = useState({ minutes: null, paragraph: '' })
  const [time, setTime] = useState({ mins: null, secs: null })
  const [startTest, setStartTest] = useState(false)
  const [paragraph, setParagraph] = useState('')
  const [typedText, setTypedText] = useState('')
  const [points, setPoints] = useState(0)
  const [typing, setTyping] = useState(false)
  const [words, setWords] = useState([])
  const [errors, setErrors] = useState({})
  const [timeUp, setTimeUp] = useState(false)
  const [timeStop, setTimeStop] = useState({})
  const [wordsIdx, setWordsIdx] = useState({})

  const timer = useRef()
  const modal = useRef()

  const handleSelectChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target
    if (test.minutes !== 77) setTime({ mins: null, secs: null })
    setTest((state) => ({ ...state, [name]: value }))
    setErrors(state => ({...state, [name]: '' }))
    if (name === 'minutes' && value !== 77) {
      timer.current.selectTimer(value)
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()

    const { name, value} = e.target
  
    if (name === 'secs' && value > 60) {
      setTime((state) => ({ ...state, mins: value % 60 === 0 ? +state.mins + +value/60 : +Math.floor(value/60) + +state.mins, [name]: value % 60 }))
    } else {
      setTime((state) => ({ ...state, [name]: value }))
    }
    timer.current.saveTimer(name, value)
    setErrors(state => ({ ...state, error: '' }))
  }

  const start = (e) => {
    e.preventDefault()
    // modal.current.openModal()
    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
    const testTime = test.minutes === 77 ? time : test.minutes
    
    if (isEmpty(testTime) && isEmpty(pars)) {
      setErrors(state => ({ ...state, minutes: 'Pick a time', error: 'Enter a value' }))
      setErrors(state => ({ ...state, paragraph: 'Pick a paragraph' }))
      return
    }
    if (test.minutes === 77) {
      if (!testTime?.mins && !testTime?.secs) {
        setErrors(state => ({ ...state, minutes: 'Pick a time', error: 'Enter a value' }))
        return
      }
    }
    if (!test.minutes === 77) {
      if (!testTime) {
        setErrors(state => ({ ...state, minutes: 'Pick a time', error: 'Enter a value' }))
        return
      }
    }
    if (isEmpty(pars)) {
      setErrors(state => ({ ...state, paragraph: 'Pick a paragraph' }))
      return
    }


    if (pars.length > 1603) {
      setErrors(state => ({ ...state, paragraph: 'Characters should not exceed 1603' }))
      return
    }
    setStartTest(true)
  }

  const handleParagragh = (e) => {
    e.preventDefault()
    setParagraph(e.target.value)
  }

  const handleTypedText = (e) => {
    e.preventDefault()

    const { value } = e.target
    if (!typing && startTest) {
      setTyping(true)
      setWords(+test.paragraph === 66 ? paragraph.split(' ') : test.paragraph.split(' '))
      timer.current.start()
    }

    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
    const enteredText = e.currentTarget.value
    const typed = enteredText.split(' ')
    
    if (points <= typed.length) {
      if (wordsIdx[typed.length - 1]) {
        setPoints(state => state + 0)
      } else if (typed[typed.length - 1] === words[typed.length - 1]) {
        setPoints(state => state + 1)
        setWordsIdx(state => ({ ...state, [typed.length - 1]: words[typed.length - 1]}))
      } else {
        setPoints(state => state + 0)
      }
    }
    
    setTypedText(value)
    if (enteredText.length === pars.length) {
      setTimeStop(timer.current.stopTime())
    }
  }

  const calTimeTaken = () => {
    let timeTaken
    if (test.minutes === 77) {
      timeTaken = +(+time.mins + +(nonZero(time.secs))) - +(!isEmpty(timeStop) ? +(+timeStop.mins + (nonZero(timeStop.secs))) : 0)
    } else {
        timeTaken = +(+test.minutes)
    }
    return timeTaken < 0.1 ? +timeTaken.toPrecision(1) : +timeTaken.toPrecision(2);
  }

  const calSpeed = () => {
    const error = +typedText.split(' ').length - +Object.keys(wordsIdx).length
    const gwpm = ((+points / 5) / calTimeTaken()).toPrecision(2)
    const errorRate = (+error > 0 ? +error / calTimeTaken() : 0).toPrecision(2)
    const wpm = +gwpm - +errorRate
    return wpm < 1 ? wpm.toPrecision(1) : wpm.toPrecision(3)
  }

  useEffect(() => {
    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
  
    if (!isEmpty(timeStop) && !!typing) {
      setTimeUp(true)
      modal.current.setModalText({ ...timeStop, points: points, words: pars.split(' ').length, speed: calSpeed(), timeTaken: calTimeTaken() })
      modal.current.openModal()
      setTyping(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText])


  const handleTimeUp = () => {
    setTimeUp(true)
    setTyping(false)
    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
    modal.current.setModalText({ mins: 0, secs: '00', points: points, words: pars.split(' ').length, speed: calSpeed(), timeTaken: calTimeTaken() })
    modal.current.openModal()
  }

  const restart = (e) => {
    e.preventDefault();
    setStartTest(false)
    setParagraph('')
    setTest({ paragraph: '', minutes: null })
    setTime({})
    setPoints(0)
    setTypedText('')
    setTimeUp(false)
    setErrors({})
    setTimeStop({})
    timer.current.selectTimer(0)
    modal.current.setModalText({})
    modal.current.closeModal()
    setWordsIdx({})
    setWords([])
  }

  return (
    <div>
      <HtmlHead title="Typing Test" />

      <main>
        <SuccessModal reStart={restart} ref={modal} />
        <Container>
          <ContentBox>
            <FirstScreen 
              errors={errors}
              test={test}
              handleSelectChange={handleSelectChange}
              startTest={startTest}
              handleInputChange={handleInputChange}
              time={time}
              paragraph={paragraph}
              paragraphData={paragraphData}
              handleParagragh={handleParagragh}
              start={start}
              timeData={timeData}
            />

            <TestScreen 
            testData={+test.paragraph === 66 ? paragraph : test.paragraph} 
            textValue={typedText}
            handleOnChange={handleTypedText}
            isDisabled={!!timeUp}
            label="Type Text"
            enteredText={typedText.split(' ')}
            errors={errors['error']}
            startTest={startTest}
            timeUp={timeUp}
            restart={restart}
            /> 

            <Scores 
              startTest={startTest}
              points={points}
              test={test}
              paragraph={paragraph}
            />

            <TimeBox>
              <Timer ref={timer} timeup={handleTimeUp} />
            </TimeBox>
          </ContentBox>
        </Container>
      </main>
    </div>
  )
}
