import React, { useState, useEffect } from 'react';
import {
    Grid,
    InputLabel,
    Pagination,
    IconButton,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useSnackbar } from 'hooks';
import { BookCard } from './components';
import { BookRequests } from 'services';
import { PagesContainer } from './BookList.styles';
import { Page, Divider, SkeletonCard } from 'components';

function BookList() {
    const snackbar = useSnackbar();

    const [bookList, setBookList] = useState([]);
    const [bookSearch, setBookSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    function componentDidMount() {
        searchBook(bookSearch, 1);
    }
    useEffect(componentDidMount, []);

    function onChangeInput(text) {
        setBookSearch(text);

        if (text === '') {
            searchBook('', 1);
        }
    }

    function searchBook(searchTerm, page) {
        if (loading) return;

        setLoading(true);
        BookRequests.SearchBook(searchTerm, page, 12).then((res) => {
            if (res) {
                setPage(page);
                setBookList(res.bookList);
                setPageCount(res.pageCount);
            } else {
                snackbar('Não foi possível buscar livro.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        }).finally(() => setLoading(false));
    }

    function loadingComponent() {
        return (
            <Grid container spacing={2} >
                {new Array(4).fill(0).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                        <SkeletonCard />
                    </Grid>
                ))}
            </Grid>
        );
    }

    function notFindBooksComponent() {
        return (
            <Typography
                variant='h5'
                gutterBottom
                component='div'
                textAlign='center'
            >
                Nenhum livro encontrado no momento.
            </Typography>
        );
    }

    return (
        <Page title='Listagem de Livros'>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <FormControl variant='outlined' fullWidth>
                        <InputLabel htmlFor='search-book-input'>Buscar Livro</InputLabel>
                        <OutlinedInput
                            value={bookSearch}
                            onChange={(event) => onChangeInput(event.target.value)}
                            id='search-book-input'
                            label='Buscar Livro'
                            placeholder='Buscar Livro'
                            variant='outlined'
                            fullWidth

                            endAdornment={(
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='search-book-button'
                                        onClick={() => searchBook(bookSearch, page)}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider title='Livros' />
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    {loading ? loadingComponent() : (
                        <React.Fragment>
                            {bookList.length === 0 ? notFindBooksComponent() : (
                                <Grid container spacing={2} >
                                    {bookList.map((book, idx) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                            <BookCard book={book} />
                                        </Grid>
                                    ))}
                                    <PagesContainer item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center'>
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={(event, value) => searchBook(bookSearch, value)}
                                        />
                                    </PagesContainer>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </Page >
    );
}

export default BookList;
