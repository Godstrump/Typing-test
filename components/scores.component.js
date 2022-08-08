import { TimeBox, Points } from '../utils/elements'


const Scores = ({ startTest, points, test, paragraph }) => (
    <>
        { 
              !!startTest ?
               <TimeBox left={23}>
                <Points 
                style={{ color: (+test.paragraph === 66 ? paragraph.split(' ').length : test.paragraph.split(' ').length) % points === 0 ? 'green' : 'black'}}
                data-testid="score-points"
                >
                    Score: {points}/{+test.paragraph === 66 ? paragraph.split(' ').length : test.paragraph.split(' ').length}
                </Points>
              </TimeBox> 
            : ''
              
        }
    </>
)

Scores.defaultProps = {
    startTest: false,
    points: 0,
    test: {},
    paragraph: ''
}

export default Scores