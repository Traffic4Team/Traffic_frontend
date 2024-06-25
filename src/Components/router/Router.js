import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../app/Home";
import BbsList from "../bbs/BbsList";
import BbsWrite from "../bbs/BbsWrite";
import BbsDetail from "../bbs/BbsDetail";
import BbsUpdate from "../bbs/BbsUpdate";
import BbsAnswer from "../bbs/BbsAnswer";
import Join from "../member/Join";
import Login from "../member/Login";
import Logout from "../member/Logout";
import Nav from "../app/Nav";
import Main from "../app/Main";
import Trip from "../app/trip";

function Router() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/nav" element={<Nav />} />
        <Route path="/main" element={<Main />} />

        <Route path="/bbslist" element={<BbsList />} />
        <Route path="/bbswrite" element={<BbsWrite />} />
        <Route path="/bbsdetail/:seq" element={<BbsDetail />} />
        <Route path="/bbsupdate" element={<BbsUpdate />} />
        <Route path="/bbsanswer/:parentSeq" element={<BbsAnswer />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/trip" element={<Trip />} />
      </Routes>

  );
}

export default Router;
