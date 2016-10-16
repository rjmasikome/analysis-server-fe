let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');
let $ = require('jquery');
//Backend
let DataStore = require('../stores/dataStore');
//React Components
let ProductAPI = require('../api/productAPI');

let {
  TextField, Paper, RaisedButton, Snackbar, CircularProgress, Checkbox, RadioButtonGroup, RadioButton
} = mui;

let Login = React.createClass({

  getInitialState () {
    return {
      userDetails: {},
      loginStatus: DataStore.getLogin(),
      loading: 'none',
      data: {mo_od: 'Error. Please try again.'},
      iframeFlag: 'none',
      context: 'mood',
      done: false
    }
  },

  componentDidMount () {

    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({data: DataStore.getPlaylist(), loading: 'none', iframeFlag: 'inline'});
    if (this.state.data.error) {
      this.state.mo_od = 'Error. Please try again.';
      this.refs.errorAlert.show();
        console.log(this.state);
    }
    else {
      console.log(this.state);
      this.state.mo_od = this.state.data.mo_od.substring(0, this.state.data.mo_od.length - 1);
      this.refs.moodAlert.show();
    }

  },

  render() {
      $(document).ready(function() {
      $("body").css("background-color", "#444F5C");
  });


    var errorMessage = "Unspecified Error! Please contact us...";

    if (this.props.query.email) emailValue = this.props.query.email;
    if (this.state.userDetails.error) errorMessage = this.state.userDetails.error;

    let textFieldStyle = {
      display: 'block',
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#686868'
    };

    return (
        <div className="landingWrapper">
          <Snackbar ref="errorAlert" message="Error try again" style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
          <Snackbar ref="moodAlert" message={this.state.mo_od} style={{top: '16px'}} autoHideDuration={5000}/>
          <div style={{textAlign: 'center'}}>
           <h3 style={{color: '#ECEFF1'}}>{"Put URL or upload image to generate Playlist"}</h3>
          <Paper className="loginWrapper">
            <form autoComplete="off" onSubmit={this._handleSubmit}>
            <TextField style={textFieldStyle} ref="urlLink" floatingLabelText="URL"  />
            <input type="file" ref="urlFile" class="upload" style={{marginLeft: 'auto', marginRight: 'auto'}}/>
            <br />
            <div style={{textAlign: 'center'}}>
            <CircularProgress style={{position: 'absolute', display:this.state.loading,top: '350px', left: '835px'}} mode="indeterminate" size={0.5} />
            </div>
            <input type="radio" name="context" value="mood" onChange={this.onContexChanged}>Mood</input><br />
            <input type="radio" name="context" value="query" onChange={this.onContexChanged}>Query</input>
            <div style={{overflow: 'hidden', paddingTop: '20px'}}>
              <div style={{marginTop: '30px', marginBottom: '5px'}}>
                  <RaisedButton label="Submit" type="submit" primary={true} />
              </div>
            </div>
            </form>
          </Paper>

          <br />
          <br />

            <iframe src={"https://embed.spotify.com/?uri=http://open.spotify.com/user/"+this.state.data.user_id+"/playlist/"+this.state.data.playlist_id+"&theme=white&rand=" + Math.round(Math.random() * 10000000)} width="600" height="580" frameborder="0" style={{border: '0px', borderRadius: '5px', display:this.state.iframeFlag}}></iframe>

          <br />
          </div>

          <br />
          <br />

        </div>
      );
  },

  onContexChanged(e) {
    this.setState({context: e.currentTarget.value});
  },

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: 'inline'});

    var details = {
      context: this.state.context
    }

    if (this.refs.urlFile.getDOMNode().files[0]) {
        var reader;

        function readFile(file, onLoadCallback){
          reader = new FileReader();
          reader.onload = onLoadCallback;
          reader.readAsDataURL(file);
        }

        readFile(this.refs.urlFile.getDOMNode().files[0], function() {

          details.data = reader.result.toString().replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
          ProductAPI.remoteGenerate(details);
        });
      }
      else {
        details.url = this.refs.urlLink.getValue();
        ProductAPI.localGenerate(details);
      }

      this.refs.urlLink.clearValue();
      this.refs.urlLink.blur();
    }

});

Login.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Login;
