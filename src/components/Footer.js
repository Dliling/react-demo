import React from 'react';
import FilterLink from '../containers/FilterLink';
import {VisibilityFilters} from '../actions';

const Footer = () => (
    <div>
        <span>SHOW:</span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>ALL</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_DONE}>DONE</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>ACTIVE</FilterLink>
    </div>
)

export default Footer;
