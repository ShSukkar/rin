import React, { Component } from 'react';
import "./MyEditor.css";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const editorStyle = {
    border: '1px solid var(--color-3)',
    padding: '5px',
    borderRadius: '2px',
    height: '300px',
    width: '100%',
    marginBottom: '20px'
};

const toolbarStyle = {
    border: '1px solid var(--color-3)'
};

export default class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState }, () => {
            const text = convertToRaw(editorState.getCurrentContent());
            this.props.editText(text);
        });
    }

    render() {
        let { editorState } = this.state;

        return (
            <div className="my-editor">
                <Editor
                    placeholder="Type your text here ..."
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    editorStyle={editorStyle}
                    toolbarStyle={toolbarStyle}
                />
            </div>
        )
    }
}
