import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        paddingTop: 50,
        boxShadow: '4px 4px 0px lightgrey'
    },
    logo: {
        width: 50
    },
    title: {
        margin: '20px auto 15px auto',
        fontSize: '1.8rem'
    },
    form: {
        width: '100%',
    },
    textField: {
        width: '70%',
        margin: '10px auto 10px auto',
        color: "primary"
    },
    button: {
        margin: '15px auto 15px auto',
        postion: 'relative'
    },
    link: {
        textDecoration: 'underline',
        color: "primary"
    },
    loading: {
        position: 'absolute',
        padding: '5 auto 5 auto',
        marginBottom: 5,
        marginTop: 5
    },
    error: {
        fontSize: '14px',
        color: "red"
    }
})

export default useStyles