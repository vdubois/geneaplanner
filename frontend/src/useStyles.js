import {alpha, makeStyles} from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    accordionColumn: {
        flexBasis: '50%',
    },
    accordionDetails: {
        flexBasis: '100% !important'
    },
    accordionHeading: {
        fontSize: theme.typography.pxToRem(15)
    },
    accordionSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
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
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        paddingTop: '84px !important'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

