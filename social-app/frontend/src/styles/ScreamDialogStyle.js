import makeStyles from '@material-ui/core/styles/makeStyles'

const ScreamDialogStyle = makeStyles({
    dialogContent: {
        position: 'relative',
        padding: 20,
        marginBottom: 10
    },
    closeButton: {
        position: 'absolute',
        top: '0',
        left: '90%'
    },
    profile: {
        minWidth: 200,
        height: 200,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    separator: {
        border: 'none',
        margin: 4
    },
    expandButton: {
        marginLeft: 5
    },
    loading: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    visibleSeparator: {
        border: '1 solid #000',
        marginBottom: 4
    },
    textField: {
        marginBottom: 10
    }
})

export default ScreamDialogStyle