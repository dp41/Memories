import React, { useState, useEffect } from "react";
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@mui/material';
import { useHistory, useLocation } from "react-router-dom";
// import Chip from '@mui/material/Chip';
// import Autocomplete from '@mui/material/Autocomplete';
import Posts from "../Posts/Posts";
import From from "../Form/Form";
import { getPostsBySearch } from "../../actions/posts"
import { useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import useStyles from './styles';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const classes = useStyles();
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history('/');
        }
    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="strech" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField id="standard-basic" name="search"
                                style={{ margin: '10px 0' }}
                                label="Search Memories"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                variant="outlined"
                                onChange={(e) => { setSearch(e.target.value) }} />

                            <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <From currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
