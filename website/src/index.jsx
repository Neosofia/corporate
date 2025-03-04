import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from './components/sections/Home';
import { Blog } from './components/sections/blog/index';

import './index.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/" element={<Blog />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  </BrowserRouter>
);