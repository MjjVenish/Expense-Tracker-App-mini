// import logo from './logo.svg';
// import './App.css';
// import { Header,Footer } from './components/inedx';
// import { Courses, Destrcture } from './components/array,object';
// import { Button } from './components/button';
// import { Stylebutton,Hooks,Hooks1, Hooks2} from './components/props/parent';
// import { Child } from './components/props/child';
// import { Acom } from './components/props/Acom';
// import { Color,ConditonalOperators,Todo } from './components/contional rendring/color';
// import { Layout } from './components/project/layout';
// import { AllPages } from "./components/task/pagetask";
// import { FindData } from './components/task/testing';
// import { Amezon } from "./components/task/amezon";
// import { Input,Myinput } from "./components/input/input";
// import React,{useState} from "react";
// import { Todolist } from "./components/task/todo";
// import { Cntain } from "./components/todo task/container";
// import { Expence } from './components/expesive/container';
// import { SideEffct } from "./components/hooks/useeffect";
// import { Component } from './components/render/component';
// import { Acomponent } from './components/render/compnentA';
// import { Parent } from './components/hooks/useCallback';
// import { KeyReducer,UseReducer,ReducerCount } from './components/hooks/useReducer';
// import { Layout } from './components/expesive/container';
// import { Offer } from "./components/hooks/offerReducer";
import { ButtonToggle } from "./components/task/butToggle";
import { useButh } from "./components/context/toggle";
import "../src/components/task/task.css"

function App() {
 const {toggle} =useButh()
 
  return (
    <div className={`App ${toggle?"black-theme":""}`}>
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      }
      {/* <Header/>
      <Footer/>
      <Courses/>
      <Destrcture><h2>welocme</h2></Destrcture>
       <Button>Red</Button>
       <Button>Green</Button>
       <Button>Blue</Button>
       <Parent />
      <Acom />
      <Color name="Viral Venish"/>
      <Color/>
      <ConditonalOperators />
      <Todo value={18} />
      <ParentChild/> */}
      {/* <Stylebutton send={"but-ton"} /> */}
      {/* <Hooks/> */}
      {/* <Hooks1/> */}
      {/* <Hooks2/> */}
      {/* <Layout /> */}
      {/* <AllPages/> */}
       {/* <FindData/> */}
       {/* <Amezon/> */}
      {/* <Todolist/> */}
      {/* <Cntain/> */}
      {/* <Expence/> */}
        {/* <SideEffct/> */}
        {/* <Component/> */}
        {/* <Acomponent/> */}
        {/* <Parent/> */}
       {/* <Input/> */}
       {/* <Myinput/> */}
       {/* <KeyReducer/> */}
       {/* <UseReducer/> */}
       {/* <ReducerCount/> */}
       {/* <Layout/> */}
       {/* <Offer/> */}
       <ButtonToggle/>
    </div>
  );
}

export default App;
