# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


# Basic commands for working with the project
`npm run dev` - To develop and debug an application

`npm run build` - To build an application for production

`npm run preview` - To start the local server from the dist directory (of the assembled application)

`npm run lint` - Check the code for syntax errors, display error information

`npm run lint-fix` - Correct syntax error notes in automatic mode


# Regulations

## CSS regulations
### General understanding
The project has a sas directory, which contains files for preset styles of the entire application.
The _reset.scss file is included in the App component and is distributed to the App components and
all child components. The _fonts.scss and _variables.scss files are included in each scss file of the application
(you can access the values of these files from any scss file). Do not worry if the editor does not detect
these variables (if desired, you can configure the editor so that it understands where the values for these
variables should be taken from).

### Rules for naming variables
To set colors, you must specify the color prefix, then the color is indicated through a dash.
If we want to specify a color option, we specify two dashes and the name of the color shade.
If we want to specify a modifier (similar to the modifier from BEM CSS), we separate the modifier with an underscore.

**Examples:** 
- `$color-red: red` - creating a variable that stores the red color
- `$color-red--light: #F15A70` - creating a variable with a color shade
- `$color-red--light_hover: #F15063` - creating a variable with a hover color value


## Fonts and text
### General understanding
**Connecting fonts:** The necessary fonts are connected via the _fonts.scss file. If the project uses 2 or more fonts, it is 
good practice to put each font in a separate folder, and use @import inside the _fonts.scss file.

**Storing font files:** Font files should be saved in src/assets/fonts. If there are more than 2 fonts in the project, 
it will be appropriate to create a separate directory for each

### Rules for naming variables
If we need to create a variable with the value of the font name, we will use the abbreviation 
ff (font-family) and the abbreviation of the font name for the variable name, and 
the full font name from _fonts.scss for the variable value.

**Examples:**

Let's imagine that we have connected the font 'Open Sans' in _fonts.scss.. Then, a variable for 
storing this font can be created as follows:
- `$ff-os: 'Open Sans', sans-serif;`
