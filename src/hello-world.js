//import addImage from './add-image.js';
//import helloWorld from './components/hello-world-button/hello-world-button.js';
import HelloWorldButton from './components/hello-world-button/hello-world-button';
import Heading from './components/heading/heading';
//import _ from 'lodash';
import React from 'react';
//helloWorld();
const heading = new Heading();
//heading.render(_.upperFirst('hello world'));
heading.render('Hello world');

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
//addImage();

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}

//helloWorldButton.methodDoesnotexist();
