import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    Pagination,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Page, Divider } from 'components';
import { useSnackbar } from 'hooks';
import { BookCard } from './components';
import { BookRequests } from 'services';
import { PagesContainer } from './BookList.styles';

function BookList() {
    const snackbar = useSnackbar();

    const [bookList, setBookList] = useState([]);
    const [bookSearch, setBookSearch] = useState('');

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    function componentDidMount() {
        searchBook(bookSearch, 1);
    }
    useEffect(componentDidMount, []);

    function onChangeInput(text) {
        if (text === '') {
            searchBook('', 1);
        } else {
            setBookSearch(text);
        }
    }

    function searchBook(searchTerm, page) {
        BookRequests.SearchBook(searchTerm, page, 12).then((res) => {
            if (res.status && res.data) {
                // const data = res.data;
                // setBookList(data.list);
                // setPageCount(data.pageCount);

                setPage(page);
            } else {
                snackbar('Não foi possível buscar livro.').warning();
            }
        }).catch((error) => {
            snackbar('Erro ao buscar livro.').error();
        });

        setBookList([{
            idBook: 1,
            author: 'Autor 1',
            title: 'Título 1',
            synopsis: 'Sinopse 1',
            genre: 'Genêro 1',
            image: 'https://picsum.photos/200/200',
            dateRegistration: '1 Mês atrás'
        }, {
            idBook: 2,
            author: 'Autor 2',
            title: 'Título 2',
            synopsis: 'Sinopse 2',
            genre: 'Genêro 2',
            image: 'https://picsum.photos/200/200',
            dateRegistration: '2 Mêses atrás'
        }, {
            idBook: 3,
            author: 'Autor 3',
            title: 'Título 3',
            synopsis: 'Sinopse 3',
            genre: 'Genêro 3',
            image: 'https://picsum.photos/200/200',
            dateRegistration: '3 Mêses atrás'
        }, {
            idBook: 4,
            author: 'Autor 4',
            title: 'Título 4',
            synopsis: 'Sinopse 4',
            genre: 'Genêro 4',
            image: 'https://picsum.photos/200/200',
            dateRegistration: '4 Mêses atrás'
        }]);
    }

    return (
        <Page title='Listagem de Livros'>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
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
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    <Divider
                        title='Livros'
                        action={(
                            <Button
                                variant='text'
                                endIcon={<FilterAltIcon />}
                            >
                                <Typography
                                    variant='h3'
                                    component='div'
                                >
                                    Filtrar
                                </Typography>
                            </Button>
                        )}
                    />
                </Grid>

                <Grid item sm={12} md={12} lg={12}>
                    <Grid container spacing={2}>
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
                </Grid>
            </Grid>
        </Page>
    );
}

export default BookList;
