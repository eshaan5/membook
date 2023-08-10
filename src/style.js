import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '15px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '12vh',
        marginTop: '4px',
      },
      heading: {
        color: '#DD00FF',
      },
      image: {
        marginLeft: '15px',
      },
      [theme.breakpoints.down('sm')]: { // media query of mui
      container: {
        flexDirection: 'column-reverse',
      }
    }
}));