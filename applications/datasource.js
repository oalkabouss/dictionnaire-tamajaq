'use strict';

let getData = () => fetch("dico.json").then((result) => result.json());

export {  getData };