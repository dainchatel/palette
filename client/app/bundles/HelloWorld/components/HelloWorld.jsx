import React, { PropTypes } from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

export default class HelloWorld extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    this.backFunction = this.backFunction.bind(this);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
      projects: [],
      colors: [],
      displaying: '',
      copying: '',
      inputs: []
     };
  }

  componentDidMount() {
    this.stuff = [];
    this.getTheProjects();
  }

  getTheProjects() {
    const csrfToken = ReactOnRails.authenticityToken();
    const headers = ReactOnRails.authenticityHeaders({});
    const user_id = this.props.user.id;
    axios({
      method: 'get',
      url: '/api/projects/'+user_id,
      headers: headers
    }).then((res) => {
      this.setState({projects: res.data})
    });
  }

  addColor(e) {
    e.preventDefault();
    const csrfToken = ReactOnRails.authenticityToken();
    const headers = ReactOnRails.authenticityHeaders({});
    const newColor = {
      project_id: this.state.displaying.id,
      code: this.color.value
    }
    axios({
      method: 'post',
      url: '/api/colors',
      data: {
        color: newColor
      },
      headers: headers
    }).then((res) => {
    let colors = this.state.colors;
    colors.push(res.data);
    this.setState({colors: colors})
    this.color.value = '';
    this.stuff = [];
    });
  }

  // copyToClipboard(e, key) {
  //   e.preventDefault();
  //   // console.log(key)
  //   // console.log(key)
  //   // this.setState({copying: key})
  //   // this.copying.focus();
  //   // this.copying.select();
  // }

  // copyNow() {
  //   console.log(this.stuff.value)
  // }

  renderColors() {

    const colors = this.state.colors;
    if (colors) {
      return (colors.map(key => <div
        className='color'
        style={{backgroundColor: key.code, color: key.code}}
        key={key.id}
        value={key.code}
        ><input
          className='div-input'
          spellCheck="false"
          value={key.code}
          ref={(input) => {
            this.stuff.push(input);
          }}
          onFocus={() => {
            console.log(this.stuff);
            for (let i = 0; i < this.stuff.length; i++) {
              if (this.stuff[i].value === key.code) {
                this.stuff[i].select();
                document.execCommand("copy");
              }
            }
          }}
          /></div>))
    }
  }

  clickHandler(name, id) {
    this.setState({displaying: {name: name, id: id}});
    const csrfToken = ReactOnRails.authenticityToken();
    const headers = ReactOnRails.authenticityHeaders({});
    axios({
      method: 'get',
      url: '/api/colors/'+id,
      headers: headers
    }).then((res) => {
      this.setState({colors: res.data})
    });
  }

  backFunction() {
    this.setState({displaying: ''});
    this.stuff = [];
  }



  renderProjects() {
    const projects = this.state.projects;
    if (projects) {
      return (projects.map(key => <div onClick={() => { this.clickHandler(key.name, key.id)}} className='project' key={key.id}>{key.name}</div>))
    }
  }

  addProject(e) {
    e.preventDefault();
    const csrfToken = ReactOnRails.authenticityToken();
    const headers = ReactOnRails.authenticityHeaders({});
    const newProject = {
      name: this.project.value,
      user_id: this.props.user.id
    }
    axios({
      method: 'post',
      url: '/api/projects',
      data: {
        project: newProject
      },
      headers: headers
    }).then((res) => {
      let projects = this.state.projects;
      projects.push(res.data);
      this.setState({projects: projects})
      this.project.value = '';
    });
  }

  projectList() {
    if (this.state.displaying === '') {
      return (
      <div>
        <form onSubmit={(e) => {this.addProject(e)}}>
          <input
            ref={(input) => {
              this.project = input;
              }
            }
            type='text'/>
          <input type='submit' value='+'/>
        </form>
        <div>
          {this.renderProjects()}
        </div>
      </div>
        );
    }
    else {
      return (
        <div>
        <p>{this.state.displaying.name}</p>
        <div className='color-container'>
          {this.renderColors()}
        </div>
          <form onSubmit={(e) => {this.addColor(e)}}>
            <input
             ref={(input) => {
              this.color = input;
              }
             }
             type='text'/>
            <input type='submit' value='+'/>
          </form>
          <div className='project' onClick={this.backFunction}>back</div>
        </div>
        );
    }
  }


  render() {
    return (
      <div>
      {this.projectList()}
      </div>
    );
  }
}


