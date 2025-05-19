// ✅ ParentComponent manages the shared state
import React, { Component } from 'react';

// Parent Component
class ParentComponent extends Component {
  //why extends
  constructor(props) {
    super(props); // what is the purpose of this line 
    // 👇 State is defined in the parent so it can be shared
    this.state1 = {
      data: 'Initial state from Parent',
    };
  }

  // 👇 Method to update the state
  handleDataUpdate = (newData) => {
    this.setState({ data: newData });
  };

  render() {
    return (
      <div>
        <h2>Parent Component</h2>
        <p>Current Data: {this.state1.data}</p>

        {/* 
          👇 Passing state and handler as props
          - `data` is the current state
          - `updateData` is a custom prop to allow child to modify state
        */}
        <ChildComponent data={this.state1.data} updateData={this.handleDataUpdate} />
      </div>
    );
  }
}

// ✅ ChildComponent is a presentational component
const ChildComponent = ({ data, updateData }) => {
  // 👇 updateData is a custom function passed from parent, not a built-in event
  return (
    <>

<div style={{ marginTop: '20px' }}>
      <h3>Child Component</h3>
      <p>Received Data: {data}</p>
      {/* 
        👇 This button uses the `updateData` function to change parent's state 
        - This is how the child communicates with the parent
        - `updateData` is a prop, not a browser event handler
      */}
      <button onClick={() => updateData('Updated from Child')}>
        Update Parent State
      </button>
    </div>

    </>
  );
};

export default ParentComponent;
