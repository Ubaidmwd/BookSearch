import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { xml2js } from "xml-js";
import { Waypoint } from "react-waypoint"
import axios from "axios"
import Grid from '@mui/material/Grid';

const Books = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const slug = searchParams.get("slug")
    const [querySlug, setQuerySlug] = useState(slug)
    const [searchedBooks, setSearchBooks] = useState([]);

    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    

    const searchBooks = async (searchInput) => {
        try {
            if (!hasNextPage) return;

            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                params: {
                    key: "FtRVHgmjzjpzKjCt3SUMw",
                    q: searchInput,
                    page: page
                }
            })

            const data = xml2js(response.data, { compact: true, ignoreComment: true, alwaysChildren: true });
            setSearchBooks(data?.GoodreadsResponse?.search?.results?.work)
            setPage(page => page + 1);
        } 
        catch (error) {
            console.log(error)
        }
    }
    const loadMoreData = () => {
        console.log(page)
        if (page > 1) {
            searchBooks(querySlug);
        }
    };

    useEffect(() => {

        searchBooks(slug)
    }, [])

    return (
        <>
      
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, md: 12 }}>

            {
                searchedBooks.length > 0 && searchedBooks.map((book, index) =>
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card sx={{ maxWidth: 345, m: 10 }} key={index}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={book?.best_book.image_url._text}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {book?.best_book.title._text}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book?.best_book.title._text}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                )
            }
            {hasNextPage && (
                <Waypoint onEnter={loadMoreData}>
                    <h5 className="text-muted mt-5">
                        Loading data{" "}

                    </h5>
                </Waypoint>
            )}
            </Grid>
           
        </>
    );
}

export default Books