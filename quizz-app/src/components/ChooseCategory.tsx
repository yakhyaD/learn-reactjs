import React from 'react';
import { useHistory } from 'react-router-dom';
import { Wrapper, ButtonWrapper } from './ChooseCategory.styles';

const categories = [
    {name:'General Knowledge', categoryNum: 9},
    {name:'Science: Computers', categoryNum: 18},
    {name:'Science and Nature', categoryNum: 17}, 
    {name:'Mythologie', categoryNum: 20}, 
    {name: 'Sports', categoryNum: 21},
    {name:'Entertainment Japanese Animes & Mangas', categoryNum: 31}, 
    {name: 'Entertainment Cartoons & Animations', categoryNum: 32},
]

function ChooseCategory() {
    const history = useHistory();
    const chooseCategory = (categroy: number) => {
        history.push(`/${categroy}`)
    }  
    
    return (
        <Wrapper>
            <h1>Choose Category</h1>
            <div>
                {categories.map((category, index) => (
                    <ButtonWrapper key={index}>
                        <button onClick={() => chooseCategory(category.categoryNum)}>
                            <span dangerouslySetInnerHTML={{ __html: category.name }} />
                        </button>
                    </ButtonWrapper>
                ))

                }
            </div>
        </Wrapper>
    )
}

export default ChooseCategory;
