import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useHistory } from "react-router-dom";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
   
    useEffect(() => {
        if (post) setData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name}, history));

        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        clear();
    }

    if(!user?.result?.name){
        return (
            <Paper className="classes.paper"  elevation={6}>
            <Typography variant="h6" align="center">
                Please Sign In to create your own memories and like other's memories.
            </Typography>
            </Paper>
        );
    }
    const clear = () => {
        setCurrentId(0);
        setData({
            title: '',
            message: '',
            tags: [],
            selectedFile: ''
        });
    }
    return (
        <Paper className="classes.paper" elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography style={{paddingTop:'20px'}} variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField  variant="outlined" name="title" label="Title" fullWidth value={postData.title} onChange={(e) => setData({ ...postData, title: e.target.value })} />
                <TextField  variant="outlined" multiline rows={4} name="message" label="Message" fullWidth value={postData.message} onChange={(e) => setData({ ...postData, message: e.target.value })} />
                <TextField  variant="outlined" name="tags" label="Tags" fullWidth value={postData.tags} onChange={(e) => setData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button className={classes.buttonClear} variant="contained" color="error" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;