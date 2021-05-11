import React from 'react'
import style from './style.scss'

const UNITS = ['px', 'pt', 'in', 'cm', 'mm']

class NumberInput extends React.Component {

    constructor(props) {
        super(props)

        this.state = this.extractNumberAndUnit()

        this.onNumberChange = this.onNumberChange.bind(this)
        this.onUnitChange = this.onUnitChange.bind(this)
    }

    componentDidUpdate() {
        const { number, unit } = this.extractNumberAndUnit()

        if (number !== this.state.number || unit !== this.state.unit) {
            this.setState({ number, unit })
        }
    }

    extractNumberAndUnit() {
        if (!this.props.value) {
            return {
                number: 0,
                unit: UNITS[0]
            }
        }

        const number = parseFloat(this.props.value, 10) || 0
		const unit = this.props.value.replace(number, '')
        return { number, unit }
    }

    onNumberChange(event) {
        const number = event.target.value
        this.setState({ number })

        const inputValue = `${parseFloat(number)}${this.state.unit}`
        this.props.onChange({
            name: this.props.name || 'number',
            value: inputValue
        })
    }

    onUnitChange(event) {
        const unit = event.target.value
        this.setState({ unit })

        const inputValue = `${this.state.number}${unit}`
        this.props.onChange({
            name: this.props.name || 'number',
            value: inputValue
        })
    }

    render() {
        const { name, min, max } = this.props
        return (
            <div className={"numberInput__18GrJ"}>
                <input type="number" name={name} value={this.state.number} min={min} max={max} onChange={this.onNumberChange} />
                <select name="unit" value={this.state.unit} onChange={this.onUnitChange}>
                    {this.renderUnits()}
                </select>
            </div>
        )
    }

    renderUnits() {
        const units = this.props.units || UNITS
        return units.map(unit => <option key={unit} value={unit}>{unit}</option>)
    }
}

export default NumberInput