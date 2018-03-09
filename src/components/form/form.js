import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import update from 'immutability-helper'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import '../../style/style.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import { EMAIL_REGEX } from '../../constants'

export default class Form extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: this.props.user,
            errors: {},
            isValid: false
        }
        this.changeInput = this.changeInput.bind(this)
        this.save = this.save.bind(this)
        this.changeDate = this.changeDate.bind(this)
    }

    changeInput ({target: {value, name}}) {
        let errorMessages = this.state.errors

        let emailValidation = false

        if (name === 'name') {
            errorMessages.erorrName = ''
            if (value === '') {
                errorMessages.erorrName = '*required';
            }
        } else if (name === 'postcode') {
          errorMessages.errorPostcode = ''
          if (value === '') {
              errorMessages.errorPostcode = '*required'
          }
        } else if (name === 'dateofbirth') {
            if (value === undefined) {
                errorMessages.errorDate = '*required'
            }
        }

        if (name === 'email') {
            errorMessages.errorEmail = ''
            if (value === '') {
                errorMessages.errorEmail = '*required'
            } else {
                emailValidation = EMAIL_REGEX.test(value)
            }
            if (!emailValidation) {
                errorMessages.errorEmail = 'Write correct email'
            }
        }

        this.setState({
            errors: errorMessages,
            user: update(this.state.user, {
                [name]: {$set: value}
            })
        })
    }

    changeDate ({target: {value}}) {
      this.props.changeStateProps('date', value)
    }

    save (e) {
        e.preventDefault()
        let errorMessages = {}

        let emailValidation = true

        if (this.state.user.name === '' && this.state.user.email === '') {
            errorMessages.erorrName = '*required'
            errorMessages.errorEmail = '*required'
        } else {
            emailValidation = EMAIL_REGEX.test(this.state.user.email)
        }

        if (this.state.user.postcode === '') {
            errorMessages.errorPostcode = '*required'
        } else if (this.state.user.dateofbirth === null) {
          errorMessages.errorDate = '*required'
        }


        if (!emailValidation) {
            errorMessages.errorEmail = 'Write correct email'
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
                      <label>Name (required):</label>
                      <TextField
                        type="text"
                        onChange={this.changeInput}
                        hintText="Write name"
                        floatingLabelText="Label Name"
                        name="name"
                        value={this.state.user.name}
                      />
                      <span className="error_message">{this.state.errors.erorrName}</span>
                    </div>

                    <div className="field">
                      <label>Email (required):</label>
                      <TextField
                        type="email"
                        hintText="test@test.com"
                        floatingLabelText="Label Email"
                        name="email"
                        onChange={this.changeInput}
                        onBlur={this.changeInput}
                        value={this.state.user.email}
                      />
                      <span className="error_message">{this.state.errors.errorEmail}</span>
                    </div>

                    <div className="field">
                      <label>Phone Number:</label>
                      <TextField
                          type="tel"
                          onChange={this.changeInput}
                          onBlur={this.changeInput}
                          hintText="(380)**-**-***"
                          floatingLabelText="Label Phone"
                          name="phone"
                          value={this.state.user.phone}
                           maxLength="12"
                      />
                      <span className="error_message">{this.state.errors.errorPhone}</span>
                    </div>

                    <div className="field">
                      <label>Address:</label>
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
                      <label>Post Code (required):</label>
                      <TextField
                          type="text"
                          onChange={this.changeInput}
                          onBlur={this.changeInput}
                          hintText="Example: B45 0HF"
                          floatingLabelText="Label Postcode"
                          name="postcode"
                          value={this.state.user.postcode}
                      />
                      <span className="error_message">{this.state.errors.errorPostcode}</span>
                    </div>

                    <div className="field">
                      <label>Date of Birth (required):</label>
                      <TextField
                          type="date"
                          onChange={this.changeDate}
                          onBlur={this.changeInput}
                          name="dateofbirth"
                      />
                      <span className="error_message">{this.state.errors.errorDate}</span>
                    </div>

                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick={this.save}
                    />

                  </Paper>
                </div>
            </div>
        )
    }
}
