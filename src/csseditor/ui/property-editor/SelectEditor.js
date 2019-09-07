import UIElement from "../../../util/UIElement";
import { LOAD, CHANGE, BIND } from "../../../util/Event";

export default class SelectEditor extends UIElement {

    initState() {
        var splitChar = this.props.split || ',';
        var options = (this.props.options || '').split(splitChar).map(it => it.trim());

        var value = this.props.value;

        return {
            splitChar,
            label: this.props.label || '',
            options, value
        }
    }

    template() {
        var { label } = this.state; 
        var hasLabel = !!label ? 'has-label' : ''
        return /*html*/`
            <div class='select-editor ${hasLabel}'>
                ${label ? `<label>${label}</label>` : '' }
                <select ref='$options'></select>
            </div>
        `
    }

    getValue () {
        return this.refs.$options.value; 
    }

    setValue (value) {
        this.state.value = value + ''; 
        this.refs.$options.val(this.state.value);
        this.refresh()
    }

    refresh(reload = false) {
        this.load();
    }

    [BIND('$options')] () {
        return {
            // 'disabled': this.state.options.length === 1,
            'data-count': this.state.options.length.toString()
        }
    }

    [LOAD('$options')] () {

        return this.state.options.map(it => {

            var selected = it === this.state.value ? 'selected' : '' 
            var value = it; 
            var label = it; 

            if (value.includes(":")) {
                var [value, label] = value.split(':')
            }

            if (label === '') {
                label = this.props['none-value'] ? this.props['none-value'] : ''
            } else if (label === '-') {
                label = '----------'
                value = ''; 
            }

            return `<option ${selected} value="${value}">${label}</option>`
        })
    }

    setOptions (options = '') {
        this.setState({ 
            options: options.split(this.state.splitChar).map(it => it.trim()) 
        })
    }

    [CHANGE('$options')] () {
        this.updateData({
            value: this.refs.$options.value 
        })
    }


    updateData (data) {
        this.setState(data, false)

        this.parent.trigger(this.props.onchange, this.props.key, this.state.value, this.props.params)
    }
}