import React from 'react';

import TextField from 'material-ui/TextField';

import validator from 'validator';

class EnhancedTextField extends React.Component 
{

	constructor(props) {
		super(props);
		this.state = {
			errorText : ''
		}
	}

	componentWillMount() {
		this.props.onFormRegister && this.props.onFormRegister(this);
	}

	handleChange = (e) => {
		this.props.onChange && this.props.onChange(e);
    	this.setState({value: e.target.value});

    	this.validateIsRequired(e.target.value) &&
    		this.validateFormat(e.target.value);
	}

	validateIsRequired(value) {
		if(!this.props.isRequired || (value && value.length > 0)){
    		this.setState({errorText: ""});
			return true;
		} else {
    		this.setState({errorText: this.props.requiredErrorText});
			return false;
		}
	}

	validateFormat(value) {

		if(this.props.validationType && 
			this.props.validationType.length > 0 && 
			value != null && 
			value.length > 0){
			
			let isValid = true;
			switch(this.props.validationType) {
				case "email":
					isValid = validator.isEmail(value);
					break;
				case "numeric":
					isValid = validator.isNumeric(value);
					break;
				case "phone":
					isValid = validator.isMobilePhone(value);
					break;
				default:
					break;
			}
			if(isValid) {
	    		this.setState({errorText: ""});
				return true;
			} else {
	    		this.setState({errorText: this.props.formatErrorText});
				return false;
			}
		} else {
    		this.setState({errorText: ""});
			return true;
		}
	}

	fieldIsValid() {
		return this.validateIsRequired(this.props.value) && this.validateFormat(this.props.value);
	}


	render() {
		return(
			<TextField id={this.props.id}
				className={this.props.className}
				defaultValue={this.props.defaultValue}
				disabled={this.props.disabled}
				errorStyle={this.props.errorStyle}
				errorText={this.state.errorText}
				floatingLabelFixed={this.props.floatingLabelFixed}
				floatingLabelFocusStyle={this.props.floatingLabelFocusStyle}
				floatingLabelStyle={this.props.floatingLabelStyle}
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				hintStyle={this.props.hintStyle}
				hintText={this.props.hintText}
				inputStyle={this.props.inputStyle}
				multiLine={this.props.multiLine}
				name={this.props.name}
				rows={this.props.rows}
				rowsMax={this.props.rowsMax}
				style={this.props.style}
				textareaStyle={this.props.textareaStyle}
				type={this.props.type}
				onChange={this.handleChange}
				value={this.props.value}/>
		);
	}
} 


export default EnhancedTextField;