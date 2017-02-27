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

  pasteColor(e) {
    e.preventDefault();
    this.color.value = 'placeholder';
    this.color.focus();
    this.color.select();
    document.execCommand("paste");
    // this.color.value = document.queryCommandEnabled('paste')
    // this.color.value = document.queryCommandSupported('paste')
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

    });
  }

  deleteColor(id, code) {
    const csrfToken = ReactOnRails.authenticityToken();
    const headers = ReactOnRails.authenticityHeaders({});
    axios({
      method: 'delete',
      url: '/api/colors/'+id,
      headers: headers
    }).then((res) => {
    let colors = this.state.colors;
    colors.push(res.data);
    this.setState({colors: colors})
    });
  }

  renderColors() {
    console.log('render colors ran')
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
    this.setState({displaying: '', inputs: []});
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
             onClick={(e) => {this.pasteColor(e)}}
             type='text'/>
            <input type='submit' value='+'/>
          </form>
          <button onClick={(e) => {this.pasteColor(e)}}>paste</button>
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


