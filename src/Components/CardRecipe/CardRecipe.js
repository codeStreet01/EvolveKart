import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SingleCard from './SingleCard/SingleCard';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


const CardRecipe = (props) => {

  const [state, setstate] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([...state]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    // Set filteredProducts with default data initially
    setFilteredProducts(state);
  }, [state]);
  
 
  const filterProducts = (term, sortType) => {
    let filtered = state.filter(product =>
      product.title.toLowerCase().includes(term)
    );
    if (sortType === 'priceLowToHigh') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHighToLow') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === 'nameAToZ') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.name));
    } else if (sortType === 'nameZToA') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.name));
    }
    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredProducts(state); // Show all products if search term is empty
    } else {
      const filtered = state.filter(product =>
        product.title.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);
    filterProducts(searchTerm, selectedSortType);
  };

  useEffect(() => {
    if (props.recipy) {
      setstate([...props.recipy])
    }

  }, [props.recipy]);


  // if (state) {
  //   for (let i = 0; i < state.length; i++) {
  //     state[i].date = i + 1
  //   }
  // }


  // let allList = ''
  // if (state) {
  //   allList = state.map((r, i) =>
  //     <SingleCard key={i} recipe={r} />
  //   )
  // }
  // Get current products
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log(currentProducts )

  return(
    <div>
    <TextField  label="Search products" id="fullWidth" value={searchTerm}
    onChange={handleSearch}/>

    <FormControl sx={{ minWidth: 120 ,marginLeft:'1%'}}>
  <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sortType}
    label="Sort by"
    onChange={handleSortChange}
  >
  <MenuItem value={"priceLowToHigh"}>Price: Low to High</MenuItem>
  <MenuItem value={"priceHighToLow"}>Price: High to Low</MenuItem>
  <MenuItem value={"nameAToZ"}>Name: A to Z</MenuItem>
  <MenuItem value={"nameZToA"}>Name: Z to A</MenuItem>
  </Select>
</FormControl>

    <div style={{ display: 'flex', flexWrap: 'wrap',marginTop:'2%' }}>
  {currentProducts.map((r,i) => (
    <SingleCard key={i} recipe={r} />
  ))}
</div>
<div>
        {/* Pagination */}
        <ul className="pagination" style={{ display: 'flex', listStyle: 'none', justifyContent: 'center', padding: 0 ,marginBottom:'2%'}}>
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
            <li style={{marginRight:'1%' }} key={index} className={currentPage === index + 1 ? 'active' : ''}>
              <button style={{padding:'10px' }}  onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
</div>)
  
}

const mapStateToProps = state => {
  return {
    recipy: state.RecipeReducer.recipes
  }
}

export default connect(mapStateToProps)(CardRecipe);
