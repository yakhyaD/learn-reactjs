import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton =({ children, onClick ,tip, BtnclassName, tipClassName}) => (
        <Tooltip title={tip} className={tipClassName} >
            <IconButton onClick={onClick} className={BtnclassName}>
                {children}
            </IconButton>
        </Tooltip>
)
export default MyButton