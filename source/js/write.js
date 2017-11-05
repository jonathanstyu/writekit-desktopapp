import React from 'react';
import {connect} from 'react-redux';
import {
  Editor, EditorState, RichUtils,
  getDefaultKeyBinding, convertToRaw, convertFromRaw
} from 'draft-js';

const pageStyle = {
  "padding": '10px',
  "height": '100%'
}

class WordSmith extends React.Component {
  constructor(props) {
    super(props);
    // Check to see if we have an editor state to start with
    try {
      var editorState = EditorState.createWithContent(convertFromRaw(props.documentFile.data))
    } catch (e) {
      var editorState = EditorState.createEmpty();
    }
    this.state = {
      editorState: editorState,
      titleEditMode: false,
      newLabel: ''
    };
    //For handling the changes in the state
    this.onChange = (editorState) => this.setState({
      titleEditMode: false,
      editorState: editorState
    });
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.save = this.save.bind(this);
    this.toggleTitleEdit = this.toggleTitleEdit.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    this.domEditor.focus()
  }

  componentWillReceiveProps(nextProps) {
    var nextEditorState;
     try {
       nextEditorState = EditorState.createWithContent(convertFromRaw(nextProps.documentFile.data));
     } catch (e) {
       nextEditorState = EditorState.createEmpty();
     }
    this.setState({editorState: nextEditorState})
  }

  save() {
    var that = this;
    var documentFile = that.props.documentFile;
    var appDetails = {
      _id: documentFile._id,
      label: documentFile.label,
      type: documentFile.type,
      data: convertToRaw(that.state.editorState.getCurrentContent())
    }
    that.props.save(appDetails);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    console.log(command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleTitleEdit() { this.setState({titleEditMode: !this.state.titleEditMode})}
  updateLabel(event) { this.setState({newLabel: event.target.value})}

  render() {
    var that = this;
    return(
      <div style={pageStyle}>
        <div onDoubleClick={that.toggleTitleEdit}>
          {
            that.state.titleEditMode ? <input placeholder="New Title" onChange={(event) => this.updateLabel(event)} /> :
            <strong>{this.props.documentFile.label == "" ? "WordSmith" : this.props.documentFile.label}</strong>
          } <span><i>{this.props.documentFile._id}</i></span>
        </div>
        <div>
          <button onClick={() => that.save(that.state.editorState)}>Save</button>
        </div>
        <Editor
          placeholder={"What is life? Write about it here."}
          editorState={that.state.editorState}
          onChange={that.onChange}
          handleKeyCommand={that.handleKeyCommand}
          ref={this.setDomEditorRef}/>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    documentFile: state.openThreadApp.get('openthreadApp')
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    save: (appDetails) => {
      dispatch({
        type: 'save',
        saveType: 'app',
        toSave: appDetails
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordSmith);
