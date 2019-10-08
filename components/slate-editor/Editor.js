import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

// Create our initial value...
const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              text: 'A line of text in a paragraph.',
            },
          ],
        },
      ],
    },
});

// Define a React component renderer for our code blocks.
function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function BoldMark(props) {
  return <strong>{props.children}</strong>
}

// Define our app...
class SlateEditor extends Component {
    // Set the initial value when the app is first constructed.
    state = {
      value: initialValue,
      isLoaded: false
    }

    componentDidMount(){
      this.setState({isLoaded: true});
    }
  
    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
      this.setState({ value })
    }

    onKeyDown = (event, editor, next) => {
      if (!event.ctrlKey) return next()
  
      // Decide what to do based on the key code...
      switch (event.key) {
        // When "B" is pressed, add a "bold" mark to the text.
        case 'b': {
          event.preventDefault();
          editor.toggleMark('bold');
          break
        }
        // When "`" is pressed, keep our existing code block logic.
        case 'x': {
          const isCode = editor.value.blocks.some(block => block.type == 'code')
          event.preventDefault()
          editor.setBlocks(isCode ? 'paragraph' : 'code')
          break
        }
        // Otherwise, let other plugins handle it.
        default: {
          return next()
        }
      }
    }

    // Add a `renderBlock` method to render a `CodeNode` for code blocks.
    renderNode = (props, editor, next) => {
      switch (props.node.type) {
        case 'code':
          return <CodeNode {...props} />
        case 'paragraph':
          return <p {...props.attributes}>{props.children}</p>
        default:
          return next()
      }
    }
  
    // Add a `renderMark` method to render marks.
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }

    // Render the editor.
    render() {
      
      const { isLoaded } = this.state;

      return (
        <Fragment>
          {
            isLoaded &&
            <Editor value={this.state.value} 
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                     />
          }
        </Fragment>
      )
    }
}

export default SlateEditor;