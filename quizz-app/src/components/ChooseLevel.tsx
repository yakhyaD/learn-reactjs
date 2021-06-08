import React from 'react';
import { useHistory } from 'react-router';
import { Wrapper, ButtonWrapper } from './ChooseLevel.styles';

const levels = ['easy', "medium", "hard"]

const ChooseLevel = (props: any) => {
  
  const history = useHistory();
  const category = props.match.params.category

  const chooseLevel = (level: string) => {
    history.push(`/${category}/${level}`)
  }

  return (
    <Wrapper>
        <h1>Choose level</h1>
        <div>
          {levels.map((level, index) => (
              <ButtonWrapper key={index}>
                  <button onClick={() => chooseLevel(level)}>
                      <span dangerouslySetInnerHTML={{ __html: level }} />
                  </button>
              </ButtonWrapper>
          ))

          }
        </div>
    </Wrapper>
  )
}

export default ChooseLevel;
