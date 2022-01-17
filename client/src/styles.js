import { makeStyles } from "@mui/styles";
// npm install @mui/styles
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
export default makeStyles({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex !important',
      flexDirection: 'row !important',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
    image: {
      marginLeft: '15px',
    },
    [theme.breakpoints.down('xm')] : {
      mainContainer: {
        flexDirection: "column-reverse",
      }
    }

  });