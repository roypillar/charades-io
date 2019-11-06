import React from 'react';

const FormFields = (props) => {

    const showLabel = (show, text) => {
        return show
            ? <label>
                    {text}
                </label>

            : null;
    }

    const validate = (state) => {
        if (state.validation.required && state.value.trim() === '') {
            return 'This field is required';
        }

        if (state.validation.maxLength && state.value.trim().length > 14) {
            return 'Please enter a name with fewer than 14 characters';
        }

        return '';

    }

    const showValidation = (data) => {
        let validationMessage = null;

        if (data.validationMessage && !data.valid) {
            validationMessage = (
                <label className="label_error">
                    {data.validationMessage}
                </label>
            );
        }
        return validationMessage;
    }

    const changeHandler = (e, id, blur) => {
        const newState = props.formData;
        newState[id].value = e.target.value;

        if (blur) {
            let validationMessage = validate(newState[id]);
            if (validationMessage !== '') {
                newState[id].valid = false;
                newState[id].validationMessage = validationMessage;
            } else 
                newState[id].valid = true;
        }
        newState[id].touched = true;
        
        props.change(newState);
    }

    const renderFormElement = (element) => {
        let data = element.settings;
        let formTemplate = null;

        switch (data.element) {
            case "input":
                formTemplate = <div>
                    {showLabel(data.label, data.labelText)}
                    <input
                        {...data.config}
                        value={data.value}
                        onChange={(event) => changeHandler(event, element.id, false)}
                        onBlur={(event) => changeHandler(event, element.id, true)}/> {showValidation(data)}

                </div>
                break;
            default:
                break;
        }

        return formTemplate;
    }

    const renderFields = () => {
        const formArray = [];

        for (let elementName in props.formData) {
            formArray.push({id: elementName, settings: props.formData[elementName]})
        }

        return formArray.map((element, i) => (
            <div key={i} className="form_element">
                {renderFormElement(element)}
            </div>
        ))
    }

    return (
        <div>
            {renderFields()}
        </div>
    );
}

export default FormFields;