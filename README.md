##### This project is a Templete to be used in [TiendApp.cl](http://tiendapp.cl). The following technologies where used: ReactJS, Redux, Material-UI :heart_eyes:, Redux-Persist, React-Router v4, etc...
--
--
## Table of Contents
- [Rquirements](#requirements)
- [Action Flow](#action-flow)
- [TO-DO](#to-do)
- [Contact](#contact)

## Requirements
Use `npm install` on the project folder to download all dependencies.
#### Dependencies:
- autosuggest-highlight: ^3.1.1,
- classnames: ^2.2.5,
- material-ui: ^1.0.0-beta.31,
- material-ui-icons: ^1.0.0-beta.17,
- moment: ^2.20.1,
- node-rsa: ^0.4.2,
- react: ^16.2.0,
- react-autosuggest: ^9.3.2,
- react-dom: ^16.2.0,
- react-redux: ^5.0.6,
- react-router-dom: ^4.2.2,
- react-scripts: 1.0.17,
- redux: ^3.7.2,
- redux-persist: ^5.5.0,
- redux-thunk: ^2.2.0,
- reselect: ^3.0.1,
- typeface-roboto: 0.0.45

## Component Structure
The template's main component is the 'Layout' component, in the shared folder. Layout has three main elements: the Menu component, the Cart component and its content. The Layouts changes its content according to the route given and renders the corresponding child component. The template comes with the following children for Layout: 
1. Account: view related to the user account. Shows the user's orders when logged in.
2. Catalog: shows all products and includes a search bar with auto-suggest.
3. Landing: it's the "home" view. Shows featured products.
4. Product: it's the view of one product in detail. 
5. Static: static pages with simple HTML elements. Shows simple text. 

Other shared elements include the Footer component, that has four child components. It includes a reduce 'About' section, a subscription form, social media buttons and copyright information. The Cart component mentioned before is also a shared component.

## TO-DO

## Contact
contacto@tiendapp.cl
