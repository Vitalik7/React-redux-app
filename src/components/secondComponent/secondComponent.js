import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import '../../style/style.css'

export default class SecondComponent extends Component {
    render () {
      const style = {
        height: 310,
        width: 350,
        margin: 10,
        display: 'inline-block',
      }
        return (
          <Paper className='result' style={style} zDepth={5} rounded={false} >
            <div>
                <p> Name: {this.props.testUser.name}</p><hr/>
                <p> Email: {this.props.testUser.email}</p><hr/>
                <p> Phone: {this.props.testUser.phone}</p><hr/>
                <p> Address: {this.props.testUser.address}</p><hr/>
                <p> Postcode: {this.props.testUser.postcode}</p><hr/>
                <p> Date of Birth: {this.props.testUser.dateofbirth}</p>
            </div>
          </Paper>
        )
    }
}
