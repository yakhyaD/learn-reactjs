import makeStyles from '@material-ui/core/styles/makeStyles'

const editDetailsStyle = makeStyles({
    button: {
        textAlign: 'center',
        float: 'right',
        '& a': {
        margin: '20px 10px'
        }
    },
    textField: {
        width: '70%',
        margin: '10px auto 10px auto',
        color: "primary"
    },
    deleteButton: {
        position: 'absolute',
        top: '18%',
        left: '90%'
    },

})
export default editDetailsStyle