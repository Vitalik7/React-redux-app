import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import update from 'immutability-helper'
import DatePicker from 'react-datepicker'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../style/style.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import moment from 'moment'
import { EMAIL_VALIDATION_REGEX } from '../../constants'

export default class Form extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: this.props.user,
            startDate: moment(),
            errors: {},
            valid: false
        }
        this.changeInput = this.changeInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitData = this.submitData.bind(this)
    }
    changeInput ({target: {value, name}}) {
        let errorMessages = this.state.errors
        let emailVal = false
        if (name === 'name') {
            errorMessages.name_error = ''
            if (value === '') {
                errorMessages.name_error = '*required'
            }
        }
        if (name === 'email') {
            errorMessages.email_error = ''
            if (value === '') {
                errorMessages.email_error = '*required'
            } else {
                emailVal = EMAIL_VALIDATION_REGEX.test(value)
            }
            if (!emailVal) {
                errorMessages.email_error = 'Write correct email'
            }
        }
        if (name === 'postcode') {
            errorMessages.postcode_error = ''
            if (value === '') {
                errorMessages.postcode_error = '*required'
            }
        }
        if (name === 'dateofbirth') {
            if (value === null) {
                errorMessages.date_error = '*required'
            }
        }
        this.setState({
            errors: errorMessages
        })
        this.setState({
            user: update(this.state.user, {
                [name]: {$set: value}
            })
        })
    }
    handleChange (target) {
        this.setState({
            startDate: target,
            user: update(this.state.user, {
                'dateofbirth': {$set: moment(target).format("YYYY/MM/DD")}
            })
        })

    }
    submitData (e) {
        e.preventDefault()
        let errorMessages = {}
        let emailVal = true
        if (this.state.user.name === '') {
            errorMessages.name_error = '*required'
        }
        if (this.state.user.email === '') {
            errorMessages.email_error = '*required'
        } else {
            emailVal = EMAIL_VALIDATION_REGEX.test(this.state.user.email)
        }
        if (this.state.user.postcode === '') {
            errorMessages.postcode_error = '*required'
        }
        if (this.state.user.dateofbirth === null) {
            errorMessages.date_error = '*required'
        }
        if (!emailVal) {
            errorMessages.email_error = 'Write correct email'
        }
        this.setState({
            errors: errorMessages
        })
        if (Object.keys(errorMessages).length === 0) {
            this.props.changeStateProps('user', this.state.user)
            this.setState({
                user: {
                    name: '',
                    email: '',
                    postcode: '',
                    phone: '',
                    address: ''
                }
            })
        }
    }
    render () {
        return (
            <div>
                <div className="fields">
                  <Paper className="paper" zDepth={5} rounded={false} >
                    <div className="field">
                      <label htmlFor="name">Name (required):</label>
                      <TextField
                        type="text"
                        onChange={this.changeInput}
                        onBlur={this.changeInput}
                        hintText="Write name"
                        floatingLabelText="Label Name"
                        name="name"
                        value={this.state.user.name}
                      />
                      <span className="error_message">{this.state.errors.name_error}</span>
                    </div>

                    <div className="field">
                      <label htmlFor="email">Email (required):</label>
                      <TextField
                        type="email"
                        hintText="test@test.com"
                        floatingLabelText="Label Email"
                        name="email"
                        onChange={this.changeInput}
                        onBlur={this.changeInput}
                        value={this.state.user.email}
                      />
                      <span className="error_message">{this.state.errors.email_error}</span>
                    </div>

                    <div className="field">
                      <label htmlFor="phone">Phone Number:</label>
                      <TextField
                          type="number"
                          onChange={this.changeInput}
                          onBlur={this.changeInput}
                          hintText="(380)**-**-***"
                          floatingLabelText="Label Phone"
                          name="phone"
                          value={this.state.user.phone}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="address">Address:</label>
                      <TextField
                          type="email"
                          hintText="Country, City etc."
                          floatingLabelText="Label Address"
                          name="address"
                          onChange={this.changeInput}
                          onBlur={this.changeInput}
                          value={this.state.user.address}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="postcode">Post Code (required):</label>
                      <TextField
                          type="text"
                          onChange={this.changeInput}
                          onBlur={this.changeInput}
                          hintText="Example: B45 0HF"
                          floatingLabelText="Label Postcode"
                          name="postcode"
                          value={this.state.user.postcode}
                      />
                      <span className="error_message">{this.state.errors.postcode_error}</span>
                    </div>

                    <div className="field">
                      <label htmlFor="email">Date of Birth (required):</label>
                      <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          onBlur={this.changeInput}
                          disabledKeyboardNavigation
                          name="dateofbirth"
                          dateFormat="YYYY/MM/DD"
                          value={this.state.user.dateofbirth}
                      />
                      <span className="error_message">{this.state.errors.date_error}</span>
                    </div>

                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick={this.submitData}
                    />

                  </Paper>
                </div>
            </div>
        )
    }
}
