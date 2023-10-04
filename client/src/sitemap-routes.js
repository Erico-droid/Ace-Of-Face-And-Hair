import React from 'react';
import { Route } from 'react-router';
import axios from 'axios'
import proxy from './proxy.json'

export default (
    <Route>
	<Route path="/" />
    <Route path="/portfolio"  />
    <Route path="/portfolio/:slug" />
    <Route path="/about" />
    <Route path="/contact" />        
    <Route path="/make-an-appointment" />
    <Route path="/services" />
    </Route>
);