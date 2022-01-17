import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
export default makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex', 
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '15px -5px',
  },
  buttonSubmit: {
    margin:'0 30px 20px 30px !important'

  },
  buttonClear: {
    margin:'0 30px 20px 30px !important',
    padding:'8px 22px 8px 22px !important'
  }
});