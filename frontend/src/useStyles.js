import {fade, makeStyles} from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    card: {
        maxWidth: 345
    },
    drawer: {
        flexShrink: 0,
    },
    appBar: {
    },
    menuButton: {
        marginRight: theme.spacing(2) + ' !important',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        paddingTop: '100px !important'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputAutoComplete: {
        // color: 'white !important',
        padding: theme.spacing(1, 1, 1, 0) + ' !important',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
        paddingTop: '10px !important',
        transition: theme.transitions.create('width'),
        width: '100% !important',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

