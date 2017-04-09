# Palette


![Palette](/palscreen.png)

## Technologies Used
- Ruby on Rails
- React on Rails
- PostgreSQL
- Axios

## Getting Started

Palette is a developer tool for keeping track of the RGB, Hex and HSL codes in your CSS. Sign up, log in, and use the input to create a new project. Inside that project, use the input to add a color you use in that project's CSS. You can paste in RGB, Hex, HSL, or semantic ('silver') color codes -- as long as you add the code exactly as you would in your CSS (for instance, include the 'rgba' prefix if using an rgba value). The color automatically loads on paste, but if you enter the code by hand, just upload it with return. A swatch of that color will then appear on your project. If you need to use that color again, just click the swatch, and it will spin to indicate that the color code you entered previously has been copied to your clipboard. 

## Code Example

```javascript

  renderColors() {
    const colors = this.state.colors;
    if (colors && this.state.displaying != "") {
      return (colors.map(key => <div key={key.id} className='color-big'><div
        className='color'
        style={{backgroundColor: key.code, color: key.code}}
        value={key.code}
        ><input
          className='div-input'
          spellCheck="false"
          value={key.code}
          ref={(input) => {
            const inputs = this.state.inputs;
            inputs.push(input);

          }}
          onFocus={() => {
            const inputs = this.state.inputs;
            console.log(inputs);
            for (let i = 0; i < inputs.length; i++) {
              if (inputs[i] != null && inputs[i].value === key.code) {
                inputs[i].select();
                document.execCommand("copy");
              }
            }
          }}
          /></div><p onClick={() => {this.deleteColor(key.id, key.code)}} className='color-p'>x</p></div>))
    }
  }

```

## Build Strategy

For scalability, I decided to use a Rails API with a PostgreSQL database. There are three tables: users, projects, and colors. The authentication uses a Rails template to create a new session each time a user logs on. 

Using the React on Rails library from shakacode, I laid a React front end over the Rails API. The login mechanism is actually part of the Rails view, and once the user logs in the React app is served. 

The React app is single page, with either the projects list and input or a single project's color swatches and input rendered, depending on the state. An added project posts to the Rails Projects API, a clicked project gets from the Rails Projects API, delete and so on. Once inside the project, a get request pulls all colors from the colors relation that have that project's project_id. Each color code is pre-populated in an input, which is in turn inside a div. The div has an inline styled background-color of the color code, and every part of the input is transparent. 

When the user clicks the div/input, it isn't seen, but the input value is selected and an executive command copies that value to the clipboard. 

## Complications/Future Improvements

In a future version of this project the color input will be replaced by a simple button which will post whatever is already on the user's clipboard, making a user narrative of app engagement only two clicks long. 

There is a bit of difficulty with the array of color inputs, one of which has to be selected in the click handler function. Currently, the function loops through the array and matches the color code with an input value, then selects and copies the entire input. This means that the state containing the list of inputs does not clear itself properly and just grows larger during each session. It also means that if there are two instances of the same color in a project, the clicked swatch may not be the same one that spins. 

## Author

Dain Chatel 



