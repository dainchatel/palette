# Palette


![Palette](assets/snap.png)

## Technologies Used
- Ruby on Rails
- React
- PostgreSQL
- Axios

## Getting Started

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



## Contributing 

Dain Chatel

## Complications/Future Improvements



## Author

Dain Chatel 



