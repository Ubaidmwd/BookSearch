import React, { useState } from 'react';
import { xml2js } from "xml-js";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { useNavigate } from 'react-router';
import Container from '@mui/material/Container';

const Search = () => {
  const [searchedBooks, setSearchBooks] = useState([]);
  const [searchSlug, setSearchSLug] = useState([])
  const navigate = useNavigate()

  const searchBooks = async (searchInput) => {
    try {
      setSearchBooks([])
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        params: {
          key: "FtRVHgmjzjpzKjCt3SUMw",
          q: searchInput
        }
      })
      const data = xml2js(response.data, { compact: true, ignoreComment: true, alwaysChildren: true });

      setSearchBooks(data?.GoodreadsResponse?.search?.results?.work)

    } catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = () => {
    navigate(`/books?slug=${searchSlug}`)
  }

  return (
    <>

      <Container maxWidth="sx">
        <Stack spacing={2} sx={{ width: 400, ml: "35%", mt: "20%" }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={searchedBooks.map((option) => option.best_book.title._text)}
            onKeyUp={(e) => { searchBooks(e.target.value) }}
            onChange={(e, value) => { setSearchSLug(value) }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <Button variant="contained" onClick={handleSubmit}>Search</Button>
        </Stack>

      </Container>

    </>
  )
}

export default Search;