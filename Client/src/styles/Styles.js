import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(5, 0),
        height: '5px',
        backgroundColor: '#000000',
    },
    smallDivider: {
        margin: theme.spacing(1, 0),
        height: '1px',
        backgroundColor: '#000000',
    },
    worldMapContainer: {
        width: '80%',
    },
    alignColumn: {
        margin: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));