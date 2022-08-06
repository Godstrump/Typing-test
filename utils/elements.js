import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export const XButton = styled(Button)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    color: 'white',
    marginTop: 10
}))

export const TestContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    height: '100%',
    width: '100%',
})

export const ParagraphContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
    gap: 3,
    textAlign: 'justify'
})

export const TestParagraph = styled('span')(({ texts, words }) => ({ 
    lineHeight: 1.5,
    fontSize: 15,
    color: texts === words ? 'green' : 'black'
}))

export const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '98vh'
  })
  
export const ContentBox = styled('div')({
    position: 'relative',
    width: '90%',
    height: '85%',
    boxShadow: '1px 1px 1px 2px #d3d3d3',
    padding: 10
})
  
  export const Title = styled('h3')(({ theme }) => ({
    textAlign: 'center',
    fontFamily: theme.palette.fontFamily,
    fontSize: 27
  }))
  
  export const TimeBox = styled('div')(({ top, left }) => ({
    position: 'absolute',
    top: 13,
    right: !left ? 23 : '',
    left: left ?? ''
  }))
  
  export const Form = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
    gap: 15,
    width: '100%',
  })
  
  export const InputBox = styled(Box)({
    display: 'flex', 
    gap: 10, 
    width: '100%', 
    justifyContent: 'center',
  })
  
  export const Points = styled('span')(({ theme }) => ({
    fontSize: 30,
    fontFamily: theme.palette.fontFamily,
  }))

export const Header = styled(Typography)(({ theme }) => ({
    padding: 10,
    fontSize: 30,
    borderBottom: '1px solid black',
    textAlign: 'center',
    width: '100%',
    fontFamily: theme.palette.fontFamily
}))

export const ScoreBoard = styled(Typography)({
    padding: 10,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    gap: 10,

})

export const Scores = styled(Typography)({
    fontSize: 25,
})