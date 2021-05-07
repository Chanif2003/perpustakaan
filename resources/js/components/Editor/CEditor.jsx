import React, { Component } from "react";
import CKEditor from "ckeditor4-react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "content",
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.val !== prevProps.val) {
            this.props.HendlerVal(this.props.val);
        }
    }

    onChange = (evt) => {
        const newVal = evt.editor.getData();
        this.setState({
            content: newVal,
        });
        // console.log(this.props);
        this.props.HendlerVal(this.state.content);
    };

    render() {
        return (
            <div className="App">
                <CKEditor
                    onChange={this.onChange.bind()}
                    data={this.props.val}
                    type="classic"
                />
            </div>
        );
    }
}

export default App;
