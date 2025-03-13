import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Navbar } from "./components/Navbar";
import { Home } from './components/sections/Home';
import { Blog } from './components/sections/blog/index';
import { QMS } from './components/sections/qms/index';
import { Footer } from './components/Footer';
import { ScrollToAnchor } from './components/ScrollToAnchor';

import './index.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <main className="bg-slate-900 text-gray-100">
    <Navbar />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog/" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />

        <Route path="/qms/" element={<QMS />} />
        <Route path="/qms/:id" element={<QMS />} />
        <Route path="/qms/procedures/:id" element={<QMS />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <ScrollToAnchor />
    </BrowserRouter >

    <Footer />
  </main>
);
