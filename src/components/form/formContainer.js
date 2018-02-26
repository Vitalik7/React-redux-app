import { connect } from 'react-redux'
import { changeStateProps } from '../../actions'
import Form from './form'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.main.user,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStateProps: (prop, value) => {
            dispatch(changeStateProps(prop, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Form)
