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
    if (isEmpty(pars) || isEmpty(testTime)) {
      if (isEmpty(pars)) {
        setErrors(state => ({ ...state, paragraph: 'Pick a paragraph' }))
        return
      }
      if (isEmpty(testTime)) {
        setErrors(state => ({ ...state, minutes: 'Pick a time', error: 'Enter a value' }))
        return
      }
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
    const typed = e.currentTarget.value.split(' ')
    if (/\s/g.test(value)) {
      typed.reverse()
      if (typed[1] === words[0]) {
        setPoints(state => state + 1)
        setWords(words.slice(1))
      }
    }
    
    setTypedText(value)
    if (enteredText.length === pars.length) {
      if (typed[0] === words[0]) {
        setPoints(state => state + 1)
        setWords(words.slice(1))
      }
    }
  }

  useEffect(() => {
    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
    if ((typedText.length === pars.length) && !!typing) {
      setTimeUp(true)
      timer.current.stopTime()
      modal.current.setModalText({ ...timer.current.stopTime(), points: points, words: pars.split(' ').length })
      modal.current.openModal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText])

  const handleTimeUp = () => {
    const pars = +test.paragraph === 66 ? paragraph : test.paragraph
    setTimeUp(true)
    modal.current.setModalText({ mins: 0, secs: '00', points: points, words: pars.split(' ').length })
    modal.current.openModal()
  }

  const restart = (e) => {
    e.preventDefault();
    setStartTest(false)
    setParagraph('')
    setTest({ paragraph: '', minutes: null })
    setTime({})
    setPoints(0)
    setTyping(false)
    setTypedText('')
    timer.current.selectTimer(0)
    modal.current.setModalText({})
    modal.current.closeModal()
    setTimeUp(false)
    setErrors({})
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
            enteredText={typedText.split(' ').reverse()}
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
